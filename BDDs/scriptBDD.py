# -*- coding:Utf-8 -*-
import datetime
import random
import time

#Script python pour generer un fichier sql permettant de remplir la base de donnees

strCommand=""
#====================================================================================================#
#============================================vehicle_type============================================#
#====================================================================================================#

strCommand +="#====================================================================================================#\n"
strCommand +="#============================================vehicle_type============================================#\n"
strCommand +="#====================================================================================================#\n\n"

type_vehicle = {
	'1':'Vélo',
	'2':'Voiture citadine',
	'3':'Voiture de sport',
	'4':'Berline',
	'5':'SUV',
	'6':'Coupé',
	'7':'Utilitaire',
	'8':'Moto',
	'9':'Fourgonette',
	'10':'4x4',
	'11':'Scooter',
	'12':'Mini-bus',
}

for key in type_vehicle :
	strCommand += "INSERT INTO vehicle_type (id, label) VALUES ("+key+",'"+type_vehicle[key]+"');\n"

#====================================================================================================#
#===========================================characteristic===========================================#
#====================================================================================================#

strCommand +="\n#====================================================================================================#\n"
strCommand +="#===========================================characteristic===========================================#\n"
strCommand +="#====================================================================================================#\n\n"

charact = {
	'1':['','Couleur',1,1,'string','str'], 
	'2':['','Marque',0,9,'string','str'], 
	'3':['','Date construction',1,8,'int','str'], 
	'4':['km','Nombre de kilomètres',0,7,'range','int'], 
	'5':['kg','Poids',1,4,'range','float'], 
	'6':['','Type Carburant',0,6,'string','str'], 
	'7':['','Date du dernier controle technique',0,5,'string','str'], 
	'8':['','Nombre de places',0,3,'int','int'], 
	'9':['','Nombre de portes',0,2,'int','int'], 
	'10':['','Immatriculation',0,10,'null','str'],
}



for key in charact :
	strCommand += ("INSERT INTO characteristic (id, unit, label, optional, rank, form, typeData) VALUES ("+str(key)+",'"+charact[key][0]+"','"+charact[key][1]+"',"
	+str(charact[key][2])+","+str(charact[key][3])+","+charact[key][4]+",'"+charact[key][5]+"');\n")


#====================================================================================================#
#========================================characteristic_type=========================================#
#====================================================================================================#
dico = {
		'1' : ['1', '2', '3', '5', '8'] ,
		'2' : ['1','2','3','4','5','6','7','8','9','10'],
		'3' : ['1','2','3','4','5','6','7','8','9','10'],
		'4' : ['1','2','3','4','5','6','7','8','9','10'],
		'5' : ['1','2','3','4','5','6','7','8','9','10'],
		'6' : ['1','2','3','4','5','6','7','8','9','10'],
		'7' : ['1','2','3','4','5','6','7','8','9','10'],
		'8' : ['1','2','3','4','5','6','7','10'],
		'9' : ['1','2','3','4','5','6','7','8','9','10'],
		'10' : ['1','2','3','4','5','6','7','8','9','10'],
		'11' : ['1','2','3','4','5','6','7','10'],
		'12' : ['1','2','3','4','5','6','7','8','9','10'],
		}

strCommand +="\n#====================================================================================================#\n"
strCommand +="#========================================characteristic_type=========================================#\n"
strCommand +="#====================================================================================================#\n\n"

for key in dico :
	for value in dico[key]:	
		strCommand += "INSERT INTO characteristic_type (idType, idCharacteristic) VALUES ("+key+","+value+");\n"

#====================================================================================================#
#===============================================agency===============================================#
#====================================================================================================#
strCommand +="\n#====================================================================================================#\n"
strCommand +="#===============================================agency===============================================#\n"
strCommand +="#====================================================================================================#\n\n"

agence = {
	'1':['location','23 rue du cinéma 38000 GRENOBLE','NULL','0000000000','link','LCL','GRENOBLE','OldCar','AZERTYUIO','1'],
	'2':['location','66 rue du mystère 69001 LYON', '1', '0000000000','link','LCL','LYON','MysteryCar','OIUYGHFDDCVBJGFB','1'],
	'3':['location','200 rue Méliès 38000 GRENOBLE','1','0000000000','link','LCL','GRENOBLE','Route de la gloire','POIUYHJNBVCDERTGYHJ','1'],
}

for key in agence :
	strCommand +=("INSERT INTO agency (id, type, address, id_mother_agency, phone_num, bankLink, bankName, city, name, rib, status) VALUES ("
	+key+",'"+agence[key][0]+"','"+agence[key][1]+"',"+agence[key][2]+",'"+agence[key][3]+"','"+agence[key][4]+"','"+agence[key][5]+"','"+agence[key][6]+"','"
	+agence[key][7]+"','"+agence[key][8]+"',"+agence[key][9]+");\n")
		
#====================================================================================================#
#================================================user================================================#
#====================================================================================================#

strCommand +="\n#====================================================================================================#\n"
strCommand +="#================================================user================================================#\n"
strCommand +="#====================================================================================================#\n\n"

user = {
#Admin
'1':['Fernandes','Heloise','administrator','admin@yopmail.com','fernandh','e5c6c9a24c97c0e50b993604af266ec459568357','0000000000','NULL','NULL','NULL','1'],
#User
'2':['Doe','John','user','john-doe@yopmail.com','doej','e5c6c9a24c97c0e50b993604af266ec459568357','0000000000','NULL','NULL','NULL','1'],
'3':['Duchamps','Martin','user','m-duchamps@yopmail.com','duchampsm','e5c6c9a24c97c0e50b993604af266ec459568357','0000000000','NULL','NULL','NULL','1'],
'4':['Durant','Louis','user','l-durant@yopmail.com','durantl','e5c6c9a24c97c0e50b993604af266ec459568357','0000000000','NULL','NULL','NULL','1'],
#Gestionnaire
'5':['FAUST','Ambrosius','gestionaire','a.faust@gehenne.com','amaimon','e5c6c9a24c97c0e50b993604af266ec459568357','0000000000','1','NULL','NULL','1'],
'6':['OKUMURA','Rin','gestionaire','r.okomura@gehenne.com','rin','e5c6c9a24c97c0e50b993604af266ec459568357','0000000000','3','NULL','NULL','1'],
}

for key in user :
	strCommand += ("INSERT INTO user (id, user_name, user_first_name, role, mail_address, login, password, phone_num, idAgency, token, token_expiration, status) VALUES ("
	+key+",'"+user[key][0]+"','"+user[key][1]+"','"+user[key][2]+"','"+user[key][3]+"','"+user[key][4]+"','"+user[key][5]+"','"+user[key][6]+"',"+user[key][7]+","
	+user[key][8]+","+user[key][9]+","+user[key][10]+");\n")

#====================================================================================================#
#===============================================vehicle==============================================#
#====================================================================================================#

strCommand +="\n#====================================================================================================#\n"
strCommand +="#===============================================vehicle==============================================#\n"
strCommand +="#====================================================================================================#\n\n"

vehicle = {
		'1' : { 
				'v':['3','La DeLorean DMC-12',99.99,'MAIF', '3' ,'1'],
				'char' : {'1' : 'Gris','2' : 'DeLorean motor company','3' : '1985','4' : '100000000000000000','5' : '1230',
							'6' : 'Essence','7' : '10/2017','8' : '2','9' : '3','10' : 'OUTATIME',}
			},
		'2' : {
				'v':['3','L’interceptor',86.78,'AXA', '1','1'],
				'char' : {'1' : 'Noir','2' : 'Frord','3' : '1982','4' : '500000','5' : '1394',
							'6' : 'Essence','7' : '11/2017','8' : '5','9' : '3','10' : 'MAX-079',} 
			},
		'3' : {
				'v':['6','Christine',0.56,'AXA', '2' ,'1'],
				'char' : {'1' : 'Rouge','2' : 'Plymouth','3' : '1983','4' : '20000','5' : '1959',
							'6' : 'Essence','7' : '10/2017','8' : '4','9' : '3','10' : 'CQB 241',}
				
			},
		'4' : {
				'v':['3','Gran Torino',200.00,'MAIF', '1' ,'1'],
				'char' : {'1' : 'Vert foncé','2' : 'Ford','3' : '2009','4' : '15000','5' : '1525',
							'6' : 'Essence','7' : '11/2017','8' : '4','9' : '3','10' : 'GT-1972',} 
			},
		'5' : {
				'v':['6','Aston Martin DB5',700,'MAIF', '3' ,'1'],
				'char' : {'1' : 'Gris métalique','2' : 'Aston Martin','3' : '2012','4' : '85000','5' : '1465',
							'6' : 'Essence','7' : '11/2017','8' : '4','9' : '3','10' : 'BTM 216A',} 
			},
		'6' : {
				'v':['7','Ecto-1',66.66,'AXA', '2' ,'1'],
				'char' : {'1' : 'Blanc','2' : 'Cadillac','3' : '1984','4' : '66666','5' : '2400',
							'6' : 'Essence','7' : '10/2017','8' : '4','9' : '5','10' : 'ECTO 1',} 
			},
		'7' : {
				'v':['1','ET',2.8,'MAIF', '2' ,'1'],
				'char' : {'1' : 'Rouge','2' : 'Spielberg','3' : '1982','5' : '12','8' : '1'} 
			},
		'8' : {
				'v':['7','GMC vandura',7.99,'AXA', '3' ,'1'],
				'char' : {'1' : 'Noir','2' : 'General Motors','3' : '1983','4' : '76000','5' : 'NULL',
							'6' : 'Essence','7' : '09/2017','8' : '5','9' : '5','10' : 'A-TEAM',} 
			},
		}
		
for key in vehicle :
	strCommand += ("INSERT INTO vehicle (id, type, brand, price, insurance, idAgency, status) VALUES ("+key+","
	+vehicle[key]['v'][0]+",'"+vehicle[key]['v'][1]+"',"+str(vehicle[key]['v'][2])+",'"+vehicle[key]['v'][3]+"', "+vehicle[key]['v'][4]+","+vehicle[key]['v'][5]+");\n")

#====================================================================================================#
#=======================================assign_characteristic========================================#
#====================================================================================================#



strCommand +="\n#====================================================================================================#\n"
strCommand +="#=======================================assign_characteristic========================================#\n"
strCommand +="#====================================================================================================#\n\n"

for key in vehicle :
	for charact in vehicle[key]['char']:	
		value = vehicle[key]['char'][charact]
		strCommand +="INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES ("+key+","+charact+",'"+value+"');\n"

#====================================================================================================#
#========================================rent + transaction==========================================#
#====================================================================================================#



nbRent = 80
dicoUserBank = {
	'2' :['LCL','link','MLKJNBFGYUI'],
	'3' :['CIC','link','ERTYUIHGVCD'],
	'4' :['BNP','link','DFGLRGJFGYU'],
	}	
	
rents = {
		'1' : [],
		'2' : [],
		'3' : [],
		'4' : [],
		'5' : [],
		'6' : [],
		'7' : [],
		'8' : [],
		}		


def strToDate(str, format):
	return datetime.datetime.strptime(str,format)

def dateToSecond(date):
	return (date-datetime.datetime(1970,1,1)).total_seconds()
		
def dateAlreadyTake(date, strNumCar):
	listDate = rents[strNumCar]
	for rangeDate in listDate:
		numDateStart = dateToSecond(strToDate(rangeDate[0],'%Y-%m-%d %H:%M:%S'))
		numDateEnd = dateToSecond(strToDate(rangeDate[1],'%Y-%m-%d %H:%M:%S'))
		dateNum = dateToSecond(date)
		if numDateStart<=dateNum and numDateEnd>=dateNum :
			return True
	return False

def randomDate(start,end,hour):
	d = datetime.datetime.fromtimestamp(random.randint(int(start),int(end)))
	return d.replace(hour=hour, minute=0, second = 0)

def randomDateDelta(date):
	delta = random.randint(1,4)
	d = date + datetime.timedelta(days=delta)
	return d.replace(hour=hour, minute=0, second = 0)


start = strToDate('2017-09-19','%Y-%m-%d')
end = strToDate('2017-12-15','%Y-%m-%d')
numStart = dateToSecond(start)
numEnd = dateToSecond(end)
for i in range(1, nbRent+1):
	numCar = str(random.randint(1,7))
	numUser = str(random.randint(2,4))
	hour = random.randint(10,17)
	delta = random.randint(1,4)
	
	newStartDate = randomDate(int(numStart),int(numEnd),hour)
	while(dateAlreadyTake(newStartDate, numCar)):
		newStartDate = randomDate(int(numStart),int(numEnd),hour)
		
	newEndDate = randomDateDelta(newStartDate)
	while(dateAlreadyTake(newEndDate, str(numCar))):
		newEndDate = randomDateDelta(newStartDate)
		
	totalHour = (newEndDate - newStartDate).total_seconds()/3600
	rents[numCar].append([newStartDate.strftime('%Y-%m-%d %H:%M:%S'),newEndDate.strftime('%Y-%m-%d %H:%M:%S'),numUser,str(round(totalHour*vehicle[numCar]['v'][2],2))])

strCommand +="\n#====================================================================================================#\n"
strCommand +="#=============================================transaction============================================#\n"
strCommand +="#====================================================================================================#\n\n"
i = 1
for vehicleID in rents:
	for rent in rents[vehicleID]:
		agency = vehicle[vehicleID]['v'][4]
		city = agence[agency][6]
		userData = dicoUserBank[str(rent[2])]
		strCommand +=("INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES ("
		+str(i)+","+rent[3]+",'"+userData[0]+"','...','"+userData[2]+"',"+agency+","+rent[2]+",'"+rent[0]+"');\n")
		i=i+1
				
#====================================================================================================#
#=========================================================================================#
#====================================================================================================#

strCommand +="\n#====================================================================================================#\n"
strCommand +="#================================================rent================================================#\n"
strCommand +="#====================================================================================================#\n\n"
i = 1
for vehicleID in rents:
	for rent in rents[vehicleID]:
		agency = vehicle[vehicleID]['v'][4]
		city = agence[agency][6]
		strCommand +=("INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES ("
		+str(i)+","+rent[2]+","+vehicleID+","+rent[3]+",'"+rent[0]+"','"+rent[1]+"','"+city+"','"+city+"',"+str(i)+");\n")
		i=i+1

print strCommand
