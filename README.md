# Générer des Entites jpa via des tables MySQL 

> Configuration de base choisie : Wildfly 10.1 et eclipse JavaEE néon 

## Etape 1 : setup

1. Installer java :smile: la base quoi
2. Installer Eclipse(version néon dans mon cas)
3. Suivre ce tutoriel pour le setup, pour installer les pluggin eclipse nécessaire, chapitre **extending eclipse** et **installing jboss tool for eclipse** :  https://wwu-pi.github.io/tutorials/lectures/acse/010_setting_up_environment_with_docker.html 
4. Installer wildfly en locale pour cela suivre ce tuto : http://www.ejbtutorial.com/j2ee/getting-started-with-j2ee-installing-wildfly-on-eclipse 

:::danger
Par contre mon eclipse ram et crash pas mal àprès avoir installé tous les pluggins
:::

## Etape 2 : Le connecteur mysql  

Suivre ce tuto : http://www.javahelps.com/2015/08/add-mysql-jdbc-driver-to-eclipse.html

## Etape 3 : Créer le projet

:::warning
Partie optionnel je sais pas si on finira pas faire quelque chose dans le genre :
Suivre ce tuto pour créer le Enterprise Application Project, EJB Project et Web Project : https://wwu-pi.github.io/tutorials/lectures/acse/020_tutorial_jboss_project.html
:::

Dans le cas du JPA : 

![](https://i.imgur.com/WLSO7K8.png)


1. Créer un nouveau projet JPA : File > New > JPA Project 
2. Dans la fenetre qui s'ouvre :
    * Donner un nom au projet (ex : MesTransports-JPA)
    * Pour le champ "Target runtime" selectionner le serveur wldfly
    * Dans le cas ou l'Enterprise Application Project est présent cocher la case EAR et selectionner le projet. 
3. Cliquer deux fois sur next jusqu'à la page **JPA Facet** et suivre ce tutoriel : https://www.youtube.com/watch?v=_dq3v2s59V8

:::warning
Dans le tuto la base est en posgreSQL donc dans notre cas c'est MySQL
:::

:::danger
Il y a normallement 7 liens à réaliser 
![](https://i.imgur.com/WpmncVh.png)
:::


## Etape 4 : Configurer wildfly pour fonctionner avec MySQL
1. Télécharger wildfly : http://download.jboss.org/wildfly/10.1.0.Final/wildfly-10.1.0.Final.zip
2. Télécharger le connecteur MySQL : https://dev.mysql.com/downloads/connector/j/
3. Aller dans modules\system\layers\base\com
4. Créer un dossier mysql\main et naviguer dedans
5. Mettre le connecteur téléchargé en étape 2 dedans
6. Créer un fichier module.xml dans le dossier racine 
    ```
    <?xml version="1.0" encoding="UTF-8"?>
    <module xmlns="urn:jboss:module:1.1" name="com.mysql">
        <resources>
            <resource-root path="{chemin du connecteur}"/>              
        </resources>
        <dependencies>
            <module name="javax.api"/>
            <module name="javax.transaction.api"/>
        </dependencies>
    </module>
    ```
7. Aller dans le fichier standalone.xml et localiser la balise "datasources-driver" et ajouter 
    ```
    <driver name="mysql" module="com.mysql">
        <driver-class>com.mysql.jdbc.Driver</driver-class>
    </driver>
    ```
 8. Ajouter une datasource aux datasources
    ```
        <datasource jndi-name="java:jboss/datasources/SchoolAppDS" pool-name="SchoolAppDS" enabled="true" use-java-context="true">
            <connection-url>jdbc:mysql://{url vers la database mysql}</connection-url>
            <driver>mysql</driver>
            <pool>
                <min-pool-size>2</min-pool-size>
                <max-pool-size>5</max-pool-size>
            </pool>
            <security>
                <user-name>{USERNAME}</user-name>
                <password>{PASSWORD}</password>
            </security>
        </datasource>
    ```
9. C'est fait!

:::
# API - url 

## Les agences

**Url de base** : api/agency

### /create
>**Fonctionnalités** : *Créer une nouvelle agence*
>
> **Paramètres** : 
>- type : type d'agence(normal, taxi....)
>- address : l'adresse physique de l'agence
>- phone : le numéro de l'agence
>- idMotherAgency : l'identifiant de l'agece mère
>
>**Sortie**:
>- Si erreur renvoie le code 200 avec un message d'erreur

### /edit
>**Fonctionnalités** : *Modifier les paramètres d'une agence*
>
> **Paramètres** :
>- id : l'identifiant de l'agence à modifier
>- type : type d'agence(normal, taxi....)
>- address : l'adresse physique de l'agence
>- phone : le numéro de l'agence
>- idMotherAgency : l'identifiant de l'agece mère
>
>**Sortie**:
>- Si erreur renvoie le code 200 avec un message d'erreur

### /view
>**Fonctionnalités** : *Visualiser les données d'une agence*
>
> **Paramètres** :
>- id : l'identifiant de l'agence à visualiser
>
>**Sortie**:
>- Renvoie les données d'une agence id, type, address, phone et idMotherAgency
>- Si erreur renvoie le code 200 avec un message d'erreur

### /delete
>**Fonctionnalités** : *Supprimer une agence*
>
>**Paramètres** :
>- id : l'identifiant de l'agence à supprimer
>
>**Sortie**:
>- Renvoie les données d'une agence id, type, address, phone et idMotherAgency
>- Si erreur renvoie le code 200 avec un message d'erreur

### /vehicle
>**Fonctionnalités** : *Visualiser la liste des véhicules d'une agence*
>
>**Paramètres** :
>- id : l'identifiant de l'agence ou de la sous-agence
>
>**Sortie**:
>- Renvoie la liste de détails de véhicule sans les caractéristiques pour une agence
>- Si erreur renvoie le code 200 avec un message d'erreur

### /list
>**Fonctionnalités** : *Obtenir la liste des sous agences pour une agence*
>
>**Paramètres** :
>- id : l'identifiant de l'agence ou de la sous-agence
>
>**Sortie**:
>- Renvoie la liste des sous agences
>- Si erreur renvoie le code 200 avec un message d'erreur

### /history
>**Fonctionnalités** : *Liste des locations effectuées pour une agence *
>
>**Paramètres** : 
>- id : identifiant de l'agence ou de la sous agence
>
>**Sortie**:
>- Renvoie la liste des locations de l'agence sur la perriode demandé(données location, données utilisateurs, données véhicules)
>- Si erreur renvoie le code 200 avec un message d'erreur


## Les users

**Url de base** : api/user

### /create
>**Fonctionnalités** : *Créer un nouvel utilisateur*
>
>**Paramètres** : 
>- login : le nom de connexion de l'utilisateur
>- username : le nom de l'utilisateur dans l'application
>- password : le mot de passe de l'utilisateur
>- mail : le mail de l'utilisateur
>- phone : le numéro de téléphone de l'utilisateur
>- role : le rôle de l'utilisateur(admin, client, renter)
>- firstname : prénom de l'utilisateur
>- lastname : nom de l'utilisateur
>
>**Sortie**:
>- Si erreur renvoie le code 200 avec un message d'erreur

### /edit
>**Fonctionnalités** : *Modifie les données d'un utilisateur*
>
>**Paramètres** : 
>- id : l'id de l'utilisateur à modifier
>- login : le nom de connexion de l'utilisateur
>- username : le nom de l'utilisateur dans l'application
>- password : le mot de passe de l'utilisateur
>- mail : le mail de l'utilisateur
>- phone : le numéro de téléphone de l'utilisateur
>- role : le rôle de l'utilisateur(admin, client, renter)
>- firstname : prénom de l'utilisateur
>- lastname : nom de l'utilisateur
>
>**Sortie**:
>- Si erreur renvoie le code 200 avec un message d'erreur

### /view
>**Fonctionnalités** : *Visualiser les données d'un utilisateur*
>
>**Paramètres** : 
>- id : l'identifiant de l'utilisateur
>
>**Sortie**:
>- Renvoie les données de l'utilisateur (id, login,username,password,mail,phone,role,firstname, lastname)
>- Si erreur renvoie le code 200 avec un message d'erreur

### /disable
>**Fonctionnalités** : *Supprimer un utilisateur*
>
>**Paramètres** : 
>- id : l'identifiant de l'utilisateur à supprimer
>
>**Sortie**:
>- Renvoie les données de l'utilisateur
>- Si erreur renvoie le code 200 avec un message d'erreur

### /authenticate
>**Fonctionnalités** : *Permettre à une utilisateur de s'identifier*
>
>**Paramètres** : 
>- login : le nom de connexion de l'utilisateur
>- password : le mot de passe de l'utilisateur
>
>**Sortie**:
>- Si erreur renvoie le code 200 avec un message d'erreur

### /logout
>**Fonctionnalités** : *Permettre à un utilisateur de se déconnecter*
>
>**Paramètres** : aucun paramètre
>
>**Sortie**:
>- Si erreur renvoie le code 200 avec un message d'erreur

### /reativate
>**Fonctionnalités** : *Réactiver un compte utilisateur*
>
>**Paramètres** : 
>- id : l'identifiant de l'utilisateur à réactiver
>
>**Sortie**:
>- Renvoie les données de l'utilisateur
>- Si erreur renvoie le code 200 avec un message d'erreur

## Les véhicules
**Url de base** : api/vehicle

### /create
>**Fonctionnalités** : *Créer un véhicule*
>
>**Paramètres** : 
>- brand : marque du véhicule
>- price : prix du véhicule
>- insurance : assurance
>- idAgency : identifiant de l'agence qui possède le véhicule
>- idType : identifiant du type de véhicule
>- caracteristics : tableaux des différentes caractéristiques
>
>**Sortie**:
>- Si erreur renvoie le code 200 avec un message d'erreur

### /list
>**Fonctionnalités** : *Obtenir la liste des caractéristiques possibles*
>
>**Paramètres** : 
>- idType : identifiant du type de véhicule 
>
>**Sortie**:
>- Renvoie n tableau où chaque item est de la forme label:{détails}
>- Si erreur renvoie le code 200 avec un message d'erreur

### /view
>**Fonctionnalités** : *Visualiser un véhicule*
>
>**Paramètres** : 
>- id : identifiant du véhicule 
>
>**Sortie**:
>- Renvoie les données véhicule (id, brand, price, insurance,idagency,idtype)
>- Si erreur renvoie le code 200 avec un message d'erreur

### /edit
>**Fonctionnalités** : *Modifier un véhicule*
>
>**Paramètres** : 
>- id : identifiant du véhicule à modifier
>- brand : marque du véhicule
>- price : prix du véhicule
>- insurance : assurance
>- idAgency : identifiant de l'agence qui possède le véhicule
>- idType : identifiant du type de véhicule
>- caracteristics : tableaux des différentes caractéristiques
>
>**Sortie**:
>- Si erreur renvoie le code 200 avec un message d'erreur

### /delete
>**Fonctionnalités** : *Effacer un véhicule*
>
>**Paramètres** : 
>- id : identifiant du véhicule à supprimer
>
>**Sortie**:
>- Si erreur renvoie le code 200 avec un message d'erreur

### /search
>**Fonctionnalités** : *Obtenir une liste de véhicule disponible sur une période de temps*
>
>**Paramètres** : 
>- being : date début periode
>- end : date de fin de periode
>
>**Sortie**:
>- Renvoie uns liste de détail de véhicule(avec leurs caractéristiques)
>- Si erreur renvoie le code 200 avec un message d'erreur

## les commandes
**Url de base** : api/ordered

### /history
>**Fonctionnalités** : *Obtenir les dernières transactions d'un utilisateur*
>
>**Paramètres** : aucun
>
>**Sortie**:
>- Renvoie la liste des détails de location pour l'utilisateur
>- Si erreur renvoie le code 200 avec un message d'erreur

## Le panier
**Url de base** : api/cart

### /add
>**Fonctionnalités** : *Ajouter un véhicule*
>
>**Paramètres** : 
>- idV : identifiant du véhicule
>- idU : identifiant de l'utilsateur
>- being : date début periode location
>- end : date de fin de periode location
>
>**Sortie**:
>- Si erreur renvoie le code 200 avec un message d'erreur

### /remove
>**Fonctionnalités** : *Supprimer un véhicule du panier*
>
>**Paramètres** : 
>- idU : identifiant utilisateur
>- idV : identifiant du véhicule
>
>**Sortie**:
>- Si erreur renvoie le code 200 avec un message d'erreur

### /ordred
>**Fonctionnalités** : *Passer la liste des véhicules dans la table location*
>
>**Paramètres** : 
>- id : identifiant utilisateur
>
>**Sortie**:
>- Si erreur renvoie le code 200 avec un message d'erreur

### /view
>**Fonctionnalités** : *Visualiser le panier*
>
>**Paramètres** : aucun paramètre
>
>**Sortie**:
>- Renvoie la liste des détails de véhicule dans le panier, ainsi que son montant, les periodes de location et les lieux de retrait
>- Si erreur renvoie le code 200 avec un message d'erreur

## Les taxis
**Url de base** : api/taxi

### /map
>**Fonctionnalités** : *Obtenir la liste des position d'un taxi en fonction d'une ville*
>
>**Paramètres** : 
>- city : ville à regarder
>
>**Sortie**:
>- Renvoie la liste des véhicules présent dans la ville ainsi que leur position et leur état
>- Si erreur renvoie le code 200 avec un message d'erreur

### /assign
>**Fonctionnalités** : *Assigner une coursse(location) à un taxi*
>
>**Paramètres** : 
>- idR : identifiant de la coursse
>- idT : identifiant du taxi
>
>**Sortie**:
>- Si erreur renvoie le code 200 avec un message d'erreur

### /finish
>**Fonctionnalités** : *Signaler qu'une course est terminer*
>
>**Paramètres** : 
>- idT : identifiant du taxi
>- idC : identifiant de la coursse
>
>**Sortie**:
>- Renvoie la liste des détails de location pour l'utilisateur
>- Si erreur renvoie le code 200 avec un message d'erreur


### /view

>**Fonctionnalités** : *Visualiser les coursses non affectées(sans paramètres), liste des coursses affecté à un taxi*
>
> **Paramètres** : 
>- idT : identifiant du taxi
>
>**Sortie**:
>- Renvoie la liste des locations soit affecté à un véhicule soit celle qui ne sont pas affecté à un véhicule.
>- Si erreur renvoie le code 200 avec un message d'erreur
