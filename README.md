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
    
