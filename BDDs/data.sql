#====================================================================================================#
#============================================vehicle_type============================================#
#====================================================================================================#

INSERT INTO vehicle_type (id, label) VALUES (11,'Scooter');
INSERT INTO vehicle_type (id, label) VALUES (10,'4x4');
INSERT INTO vehicle_type (id, label) VALUES (12,'Mini-bus');
INSERT INTO vehicle_type (id, label) VALUES (1,'Vélo');
INSERT INTO vehicle_type (id, label) VALUES (3,'Voiture de sport');
INSERT INTO vehicle_type (id, label) VALUES (2,'Voiture citadine');
INSERT INTO vehicle_type (id, label) VALUES (5,'SUV');
INSERT INTO vehicle_type (id, label) VALUES (4,'Berline');
INSERT INTO vehicle_type (id, label) VALUES (7,'Utilitaire');
INSERT INTO vehicle_type (id, label) VALUES (6,'Coupé');
INSERT INTO vehicle_type (id, label) VALUES (9,'Fourgonette');
INSERT INTO vehicle_type (id, label) VALUES (8,'Moto');

#====================================================================================================#
#===========================================characteristic===========================================#
#====================================================================================================#

INSERT INTO characteristic (id, unit, label, optional, rank, form, typeData) VALUES (1,'','Couleur',1,1,string,'str');
INSERT INTO characteristic (id, unit, label, optional, rank, form, typeData) VALUES (10,'','Immatriculation',0,10,null,'str');
INSERT INTO characteristic (id, unit, label, optional, rank, form, typeData) VALUES (3,'','Date construction',1,8,int,'str');
INSERT INTO characteristic (id, unit, label, optional, rank, form, typeData) VALUES (2,'','Marque',0,9,string,'str');
INSERT INTO characteristic (id, unit, label, optional, rank, form, typeData) VALUES (5,'kg','Poids',1,4,range,'float');
INSERT INTO characteristic (id, unit, label, optional, rank, form, typeData) VALUES (4,'km','Nombre de kilomètres',0,7,range,'int');
INSERT INTO characteristic (id, unit, label, optional, rank, form, typeData) VALUES (7,'','Date du dernier controle technique',0,5,string,'str');
INSERT INTO characteristic (id, unit, label, optional, rank, form, typeData) VALUES (6,'','Type Carburant',0,6,string,'str');
INSERT INTO characteristic (id, unit, label, optional, rank, form, typeData) VALUES (9,'','Nombre de portes',0,2,int,'int');
INSERT INTO characteristic (id, unit, label, optional, rank, form, typeData) VALUES (8,'','Nombre de places',0,3,int,'int');

#====================================================================================================#
#========================================characteristic_type=========================================#
#====================================================================================================#

INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (11,1);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (11,2);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (11,3);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (11,4);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (11,5);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (11,6);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (11,7);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (11,10);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (10,1);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (10,2);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (10,3);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (10,4);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (10,5);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (10,6);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (10,7);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (10,8);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (10,9);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (10,10);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (12,1);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (12,2);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (12,3);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (12,4);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (12,5);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (12,6);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (12,7);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (12,8);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (12,9);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (12,10);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (1,1);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (1,2);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (1,3);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (1,5);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (1,8);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (3,1);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (3,2);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (3,3);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (3,4);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (3,5);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (3,6);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (3,7);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (3,8);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (3,9);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (3,10);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (2,1);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (2,2);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (2,3);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (2,4);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (2,5);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (2,6);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (2,7);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (2,8);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (2,9);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (2,10);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (5,1);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (5,2);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (5,3);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (5,4);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (5,5);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (5,6);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (5,7);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (5,8);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (5,9);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (5,10);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (4,1);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (4,2);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (4,3);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (4,4);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (4,5);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (4,6);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (4,7);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (4,8);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (4,9);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (4,10);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (7,1);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (7,2);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (7,3);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (7,4);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (7,5);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (7,6);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (7,7);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (7,8);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (7,9);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (7,10);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (6,1);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (6,2);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (6,3);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (6,4);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (6,5);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (6,6);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (6,7);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (6,8);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (6,9);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (6,10);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (9,1);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (9,2);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (9,3);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (9,4);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (9,5);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (9,6);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (9,7);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (9,8);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (9,9);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (9,10);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (8,1);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (8,2);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (8,3);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (8,4);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (8,5);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (8,6);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (8,7);
INSERT INTO characteristic_type (idType, idCharacteristic) VALUES (8,10);

#====================================================================================================#
#===============================================agency===============================================#
#====================================================================================================#

INSERT INTO agency (id, type, address, id_mother_agency, phone_num, bankLink, bankName, city, name, rib, status) VALUES (1,'location','23 rue du cinéma 38000 GRENOBLE',NULL,'0000000000','link','LCL','GRENOBLE','OldCar','AZERTYUIO',1);
INSERT INTO agency (id, type, address, id_mother_agency, phone_num, bankLink, bankName, city, name, rib, status) VALUES (3,'location','200 rue Méliès 38000 GRENOBLE',1,'0000000000','link','LCL','GRENOBLE','Route de la gloire','POIUYHJNBVCDERTGYHJ',1);
INSERT INTO agency (id, type, address, id_mother_agency, phone_num, bankLink, bankName, city, name, rib, status) VALUES (2,'location','66 rue du mystère 69001 LYON',1,'0000000000','link','LCL','LYON','MysteryCar','OIUYGHFDDCVBJGFB',1);

#====================================================================================================#
#================================================user================================================#
#====================================================================================================#

INSERT INTO user (id, user_name, user_first_name, role, mail_address, login, password, phone_num, idAgency, token, token_expiration, status) VALUES (1,'Fernandes','Heloise','administrator','admin@yopmail.com','fernandh','e5c6c9a24c97c0e50b993604af266ec459568357','0000000000',NULL,NULL,NULL,1);
INSERT INTO user (id, user_name, user_first_name, role, mail_address, login, password, phone_num, idAgency, token, token_expiration, status) VALUES (3,'Duchamps','Martin','user','m-duchamps@yopmail.com','duchampsm','e5c6c9a24c97c0e50b993604af266ec459568357','0000000000',NULL,NULL,NULL,1);
INSERT INTO user (id, user_name, user_first_name, role, mail_address, login, password, phone_num, idAgency, token, token_expiration, status) VALUES (2,'Doe','John','user','john-doe@yopmail.com','doej','e5c6c9a24c97c0e50b993604af266ec459568357','0000000000',NULL,NULL,NULL,1);
INSERT INTO user (id, user_name, user_first_name, role, mail_address, login, password, phone_num, idAgency, token, token_expiration, status) VALUES (5,'FAUST','Ambrosius','gestionaire','a.faust@gehenne.com','amaimon','e5c6c9a24c97c0e50b993604af266ec459568357','0000000000',1,NULL,NULL,1);
INSERT INTO user (id, user_name, user_first_name, role, mail_address, login, password, phone_num, idAgency, token, token_expiration, status) VALUES (4,'Durant','Louis','user','l-durant@yopmail.com','durantl','e5c6c9a24c97c0e50b993604af266ec459568357','0000000000',NULL,NULL,NULL,1);
INSERT INTO user (id, user_name, user_first_name, role, mail_address, login, password, phone_num, idAgency, token, token_expiration, status) VALUES (6,'OKUMURA','Rin','gestionaire','r.okomura@gehenne.com','rin','e5c6c9a24c97c0e50b993604af266ec459568357','0000000000',3,NULL,NULL,1);

#====================================================================================================#
#===============================================vehicle==============================================#
#====================================================================================================#

INSERT INTO vehicle (id, type, brand, price, insurance, idAgency, status) VALUES (1,3,'La DeLorean DMC-12',99.99,'MAIF', 3,1);
INSERT INTO vehicle (id, type, brand, price, insurance, idAgency, status) VALUES (3,6,'Christine',0.56,'AXA', 2,1);
INSERT INTO vehicle (id, type, brand, price, insurance, idAgency, status) VALUES (2,3,'L’interceptor',86.78,'AXA', 1,1);
INSERT INTO vehicle (id, type, brand, price, insurance, idAgency, status) VALUES (5,6,'Aston Martin DB5',700,'MAIF', 3,1);
INSERT INTO vehicle (id, type, brand, price, insurance, idAgency, status) VALUES (4,3,'Gran Torino',200.0,'MAIF', 1,1);
INSERT INTO vehicle (id, type, brand, price, insurance, idAgency, status) VALUES (7,1,'ET',2.8,'MAIF', 2,1);
INSERT INTO vehicle (id, type, brand, price, insurance, idAgency, status) VALUES (6,7,'Ecto-1',66.66,'AXA', 2,1);
INSERT INTO vehicle (id, type, brand, price, insurance, idAgency, status) VALUES (8,7,'GMC vandura',7.99,'AXA', 3,1);

#====================================================================================================#
#=======================================assign_characteristic========================================#
#====================================================================================================#

INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (1,1,'Gris');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (1,10,'OUTATIME');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (1,3,'1985');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (1,2,'DeLorean motor company');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (1,5,'1230');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (1,4,'100000000000000000');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (1,7,'10/2017');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (1,6,'Essence');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (1,9,'3');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (1,8,'2');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (3,1,'Rouge');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (3,10,'CQB 241');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (3,3,'1983');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (3,2,'Plymouth');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (3,5,'1959');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (3,4,'20000');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (3,7,'10/2017');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (3,6,'Essence');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (3,9,'3');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (3,8,'4');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (2,1,'Noir');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (2,10,'MAX-079');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (2,3,'1982');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (2,2,'Frord');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (2,5,'1394');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (2,4,'500000');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (2,7,'11/2017');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (2,6,'Essence');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (2,9,'3');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (2,8,'5');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (5,1,'Gris métalique');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (5,10,'BTM 216A');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (5,3,'2012');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (5,2,'Aston Martin');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (5,5,'1465');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (5,4,'85000');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (5,7,'11/2017');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (5,6,'Essence');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (5,9,'3');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (5,8,'4');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (4,1,'Vert foncé');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (4,10,'GT-1972');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (4,3,'2009');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (4,2,'Ford');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (4,5,'1525');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (4,4,'15000');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (4,7,'11/2017');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (4,6,'Essence');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (4,9,'3');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (4,8,'4');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (7,1,'Rouge');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (7,8,'1');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (7,3,'1982');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (7,2,'Spielberg');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (7,5,'12');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (6,1,'Blanc');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (6,10,'ECTO 1');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (6,3,'1984');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (6,2,'Cadillac');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (6,5,'2400');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (6,4,'66666');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (6,7,'10/2017');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (6,6,'Essence');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (6,9,'5');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (6,8,'4');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (8,1,'Noir');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (8,10,'A-TEAM');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (8,3,'1983');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (8,2,'General Motors');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (8,5,'NULL');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (8,4,'76000');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (8,7,'09/2017');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (8,6,'Essence');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (8,9,'5');
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (8,8,'5');

#====================================================================================================#
#=============================================transaction============================================#
#====================================================================================================#

INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (1,9599.04,'LCL','...','MLKJNBFGYUI',3,2,'2017-12-08 16:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (2,2399.76,'BNP','...','DFGLRGJFGYU',3,4,'2017-11-08 17:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (3,2399.76,'LCL','...','MLKJNBFGYUI',3,2,'2017-10-16 16:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (4,9599.04,'CIC','...','ERTYUIHGVCD',3,3,'2017-11-03 17:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (5,2399.76,'LCL','...','MLKJNBFGYUI',3,2,'2017-09-30 11:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (6,7199.28,'CIC','...','ERTYUIHGVCD',3,3,'2017-09-29 11:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (7,4799.52,'LCL','...','MLKJNBFGYUI',3,2,'2017-10-23 15:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (8,9599.04,'CIC','...','ERTYUIHGVCD',3,3,'2017-11-27 14:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (9,2399.76,'LCL','...','MLKJNBFGYUI',3,2,'2017-10-29 13:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (10,2399.76,'CIC','...','ERTYUIHGVCD',3,3,'2017-09-28 10:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (11,9599.04,'CIC','...','ERTYUIHGVCD',3,3,'2017-11-13 17:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (12,2399.76,'CIC','...','ERTYUIHGVCD',3,3,'2017-12-03 17:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (13,9599.04,'LCL','...','MLKJNBFGYUI',3,2,'2017-10-18 10:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (14,2399.76,'CIC','...','ERTYUIHGVCD',3,3,'2017-12-07 10:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (15,9599.04,'BNP','...','DFGLRGJFGYU',3,4,'2017-10-05 13:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (16,13.44,'BNP','...','DFGLRGJFGYU',2,4,'2017-12-08 10:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (17,13.44,'BNP','...','DFGLRGJFGYU',2,4,'2017-12-04 10:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (18,26.88,'LCL','...','MLKJNBFGYUI',2,2,'2017-10-19 10:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (19,53.76,'CIC','...','ERTYUIHGVCD',2,3,'2017-11-13 10:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (20,40.32,'BNP','...','DFGLRGJFGYU',2,4,'2017-12-10 17:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (21,13.44,'CIC','...','ERTYUIHGVCD',2,3,'2017-09-20 12:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (22,26.88,'BNP','...','DFGLRGJFGYU',2,4,'2017-10-24 10:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (23,40.32,'CIC','...','ERTYUIHGVCD',2,3,'2017-10-23 16:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (24,40.32,'LCL','...','MLKJNBFGYUI',2,2,'2017-11-22 13:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (25,13.44,'BNP','...','DFGLRGJFGYU',2,4,'2017-11-11 14:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (26,26.88,'LCL','...','MLKJNBFGYUI',2,2,'2017-11-01 16:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (27,40.32,'CIC','...','ERTYUIHGVCD',2,3,'2017-11-05 11:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (28,8330.88,'LCL','...','MLKJNBFGYUI',1,2,'2017-10-04 14:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (29,4165.44,'LCL','...','MLKJNBFGYUI',1,2,'2017-11-11 13:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (30,2082.72,'LCL','...','MLKJNBFGYUI',1,2,'2017-10-01 10:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (31,2082.72,'CIC','...','ERTYUIHGVCD',1,3,'2017-11-07 10:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (32,6248.16,'CIC','...','ERTYUIHGVCD',1,3,'2017-10-18 10:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (33,2082.72,'CIC','...','ERTYUIHGVCD',1,3,'2017-10-16 13:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (34,2082.72,'CIC','...','ERTYUIHGVCD',1,3,'2017-10-03 12:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (35,4165.44,'CIC','...','ERTYUIHGVCD',1,3,'2017-12-12 15:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (36,2082.72,'LCL','...','MLKJNBFGYUI',1,2,'2017-09-28 10:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (37,2082.72,'LCL','...','MLKJNBFGYUI',1,2,'2017-11-14 17:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (38,4165.44,'CIC','...','ERTYUIHGVCD',1,3,'2017-12-02 16:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (39,2082.72,'CIC','...','ERTYUIHGVCD',1,3,'2017-12-09 10:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (40,2082.72,'BNP','...','DFGLRGJFGYU',1,4,'2017-12-10 13:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (41,2082.72,'BNP','...','DFGLRGJFGYU',1,4,'2017-11-30 16:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (42,50400.0,'CIC','...','ERTYUIHGVCD',3,3,'2017-10-16 13:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (43,16800.0,'LCL','...','MLKJNBFGYUI',3,2,'2017-12-05 15:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (44,67200.0,'CIC','...','ERTYUIHGVCD',3,3,'2017-11-05 17:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (45,16800.0,'LCL','...','MLKJNBFGYUI',3,2,'2017-12-09 12:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (46,33600.0,'CIC','...','ERTYUIHGVCD',3,3,'2017-09-25 10:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (47,33600.0,'CIC','...','ERTYUIHGVCD',3,3,'2017-11-24 10:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (48,50400.0,'CIC','...','ERTYUIHGVCD',3,3,'2017-09-21 12:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (49,50400.0,'LCL','...','MLKJNBFGYUI',3,2,'2017-12-04 14:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (50,67200.0,'CIC','...','ERTYUIHGVCD',3,3,'2017-11-11 14:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (51,16800.0,'CIC','...','ERTYUIHGVCD',3,3,'2017-10-26 11:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (52,16800.0,'LCL','...','MLKJNBFGYUI',3,2,'2017-10-04 17:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (53,14400.0,'BNP','...','DFGLRGJFGYU',1,4,'2017-09-20 10:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (54,4800.0,'LCL','...','MLKJNBFGYUI',1,2,'2017-11-29 17:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (55,9600.0,'CIC','...','ERTYUIHGVCD',1,3,'2017-09-28 17:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (56,19200.0,'LCL','...','MLKJNBFGYUI',1,2,'2017-12-03 15:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (57,4800.0,'BNP','...','DFGLRGJFGYU',1,4,'2017-12-02 12:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (58,19200.0,'CIC','...','ERTYUIHGVCD',1,3,'2017-10-12 13:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (59,19200.0,'BNP','...','DFGLRGJFGYU',1,4,'2017-10-28 14:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (60,9600.0,'CIC','...','ERTYUIHGVCD',1,3,'2017-10-09 13:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (61,268.8,'CIC','...','ERTYUIHGVCD',2,3,'2017-12-03 11:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (62,134.4,'BNP','...','DFGLRGJFGYU',2,4,'2017-11-03 13:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (63,67.2,'LCL','...','MLKJNBFGYUI',2,2,'2017-11-01 16:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (64,67.2,'BNP','...','DFGLRGJFGYU',2,4,'2017-11-28 12:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (65,67.2,'LCL','...','MLKJNBFGYUI',2,2,'2017-11-29 13:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (66,268.8,'LCL','...','MLKJNBFGYUI',2,2,'2017-10-10 15:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (67,1599.84,'LCL','...','MLKJNBFGYUI',2,2,'2017-10-19 13:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (68,4799.52,'LCL','...','MLKJNBFGYUI',2,2,'2017-11-13 12:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (69,6399.36,'BNP','...','DFGLRGJFGYU',2,4,'2017-11-16 13:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (70,6399.36,'LCL','...','MLKJNBFGYUI',2,2,'2017-11-20 14:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (71,4799.52,'LCL','...','MLKJNBFGYUI',2,2,'2017-11-28 17:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (72,4799.52,'LCL','...','MLKJNBFGYUI',2,2,'2017-10-13 14:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (73,4799.52,'LCL','...','MLKJNBFGYUI',2,2,'2017-11-08 16:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (74,1599.84,'BNP','...','DFGLRGJFGYU',2,4,'2017-10-23 15:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (75,3199.68,'CIC','...','ERTYUIHGVCD',2,3,'2017-10-08 11:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (76,3199.68,'CIC','...','ERTYUIHGVCD',2,3,'2017-12-14 16:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (77,6399.36,'LCL','...','MLKJNBFGYUI',2,2,'2017-11-28 11:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (78,4799.52,'CIC','...','ERTYUIHGVCD',2,3,'2017-11-05 11:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (79,1599.84,'LCL','...','MLKJNBFGYUI',2,2,'2017-09-23 10:00:00');
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date) VALUES (80,6399.36,'CIC','...','ERTYUIHGVCD',2,3,'2017-12-06 16:00:00');

#====================================================================================================#
#================================================rent================================================#
#====================================================================================================#

INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (1,2,1,9599.04,'2017-12-08 16:00:00','2017-12-12 16:00:00','GRENOBLE','GRENOBLE',1);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (2,4,1,2399.76,'2017-11-08 17:00:00','2017-11-09 17:00:00','GRENOBLE','GRENOBLE',2);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (3,2,1,2399.76,'2017-10-16 16:00:00','2017-10-17 16:00:00','GRENOBLE','GRENOBLE',3);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (4,3,1,9599.04,'2017-11-03 17:00:00','2017-11-07 17:00:00','GRENOBLE','GRENOBLE',4);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (5,2,1,2399.76,'2017-09-30 11:00:00','2017-10-01 11:00:00','GRENOBLE','GRENOBLE',5);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (6,3,1,7199.28,'2017-09-29 11:00:00','2017-10-02 11:00:00','GRENOBLE','GRENOBLE',6);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (7,2,1,4799.52,'2017-10-23 15:00:00','2017-10-25 15:00:00','GRENOBLE','GRENOBLE',7);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (8,3,1,9599.04,'2017-11-27 14:00:00','2017-12-01 14:00:00','GRENOBLE','GRENOBLE',8);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (9,2,1,2399.76,'2017-10-29 13:00:00','2017-10-30 13:00:00','GRENOBLE','GRENOBLE',9);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (10,3,1,2399.76,'2017-09-28 10:00:00','2017-09-29 10:00:00','GRENOBLE','GRENOBLE',10);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (11,3,1,9599.04,'2017-11-13 17:00:00','2017-11-17 17:00:00','GRENOBLE','GRENOBLE',11);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (12,3,1,2399.76,'2017-12-03 17:00:00','2017-12-04 17:00:00','GRENOBLE','GRENOBLE',12);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (13,2,1,9599.04,'2017-10-18 10:00:00','2017-10-22 10:00:00','GRENOBLE','GRENOBLE',13);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (14,3,1,2399.76,'2017-12-07 10:00:00','2017-12-08 10:00:00','GRENOBLE','GRENOBLE',14);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (15,4,1,9599.04,'2017-10-05 13:00:00','2017-10-09 13:00:00','GRENOBLE','GRENOBLE',15);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (16,4,3,13.44,'2017-12-08 10:00:00','2017-12-09 10:00:00','LYON','LYON',16);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (17,4,3,13.44,'2017-12-04 10:00:00','2017-12-05 10:00:00','LYON','LYON',17);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (18,2,3,26.88,'2017-10-19 10:00:00','2017-10-21 10:00:00','LYON','LYON',18);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (19,3,3,53.76,'2017-11-13 10:00:00','2017-11-17 10:00:00','LYON','LYON',19);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (20,4,3,40.32,'2017-12-10 17:00:00','2017-12-13 17:00:00','LYON','LYON',20);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (21,3,3,13.44,'2017-09-20 12:00:00','2017-09-21 12:00:00','LYON','LYON',21);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (22,4,3,26.88,'2017-10-24 10:00:00','2017-10-26 10:00:00','LYON','LYON',22);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (23,3,3,40.32,'2017-10-23 16:00:00','2017-10-26 16:00:00','LYON','LYON',23);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (24,2,3,40.32,'2017-11-22 13:00:00','2017-11-25 13:00:00','LYON','LYON',24);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (25,4,3,13.44,'2017-11-11 14:00:00','2017-11-12 14:00:00','LYON','LYON',25);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (26,2,3,26.88,'2017-11-01 16:00:00','2017-11-03 16:00:00','LYON','LYON',26);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (27,3,3,40.32,'2017-11-05 11:00:00','2017-11-08 11:00:00','LYON','LYON',27);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (28,2,2,8330.88,'2017-10-04 14:00:00','2017-10-08 14:00:00','GRENOBLE','GRENOBLE',28);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (29,2,2,4165.44,'2017-11-11 13:00:00','2017-11-13 13:00:00','GRENOBLE','GRENOBLE',29);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (30,2,2,2082.72,'2017-10-01 10:00:00','2017-10-02 10:00:00','GRENOBLE','GRENOBLE',30);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (31,3,2,2082.72,'2017-11-07 10:00:00','2017-11-08 10:00:00','GRENOBLE','GRENOBLE',31);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (32,3,2,6248.16,'2017-10-18 10:00:00','2017-10-21 10:00:00','GRENOBLE','GRENOBLE',32);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (33,3,2,2082.72,'2017-10-16 13:00:00','2017-10-17 13:00:00','GRENOBLE','GRENOBLE',33);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (34,3,2,2082.72,'2017-10-03 12:00:00','2017-10-04 12:00:00','GRENOBLE','GRENOBLE',34);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (35,3,2,4165.44,'2017-12-12 15:00:00','2017-12-14 15:00:00','GRENOBLE','GRENOBLE',35);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (36,2,2,2082.72,'2017-09-28 10:00:00','2017-09-29 10:00:00','GRENOBLE','GRENOBLE',36);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (37,2,2,2082.72,'2017-11-14 17:00:00','2017-11-15 17:00:00','GRENOBLE','GRENOBLE',37);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (38,3,2,4165.44,'2017-12-02 16:00:00','2017-12-04 16:00:00','GRENOBLE','GRENOBLE',38);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (39,3,2,2082.72,'2017-12-09 10:00:00','2017-12-10 10:00:00','GRENOBLE','GRENOBLE',39);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (40,4,2,2082.72,'2017-12-10 13:00:00','2017-12-11 13:00:00','GRENOBLE','GRENOBLE',40);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (41,4,2,2082.72,'2017-11-30 16:00:00','2017-12-01 16:00:00','GRENOBLE','GRENOBLE',41);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (42,3,5,50400.0,'2017-10-16 13:00:00','2017-10-19 13:00:00','GRENOBLE','GRENOBLE',42);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (43,2,5,16800.0,'2017-12-05 15:00:00','2017-12-06 15:00:00','GRENOBLE','GRENOBLE',43);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (44,3,5,67200.0,'2017-11-05 17:00:00','2017-11-09 17:00:00','GRENOBLE','GRENOBLE',44);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (45,2,5,16800.0,'2017-12-09 12:00:00','2017-12-10 12:00:00','GRENOBLE','GRENOBLE',45);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (46,3,5,33600.0,'2017-09-25 10:00:00','2017-09-27 10:00:00','GRENOBLE','GRENOBLE',46);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (47,3,5,33600.0,'2017-11-24 10:00:00','2017-11-26 10:00:00','GRENOBLE','GRENOBLE',47);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (48,3,5,50400.0,'2017-09-21 12:00:00','2017-09-24 12:00:00','GRENOBLE','GRENOBLE',48);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (49,2,5,50400.0,'2017-12-04 14:00:00','2017-12-07 14:00:00','GRENOBLE','GRENOBLE',49);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (50,3,5,67200.0,'2017-11-11 14:00:00','2017-11-15 14:00:00','GRENOBLE','GRENOBLE',50);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (51,3,5,16800.0,'2017-10-26 11:00:00','2017-10-27 11:00:00','GRENOBLE','GRENOBLE',51);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (52,2,5,16800.0,'2017-10-04 17:00:00','2017-10-05 17:00:00','GRENOBLE','GRENOBLE',52);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (53,4,4,14400.0,'2017-09-20 10:00:00','2017-09-23 10:00:00','GRENOBLE','GRENOBLE',53);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (54,2,4,4800.0,'2017-11-29 17:00:00','2017-11-30 17:00:00','GRENOBLE','GRENOBLE',54);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (55,3,4,9600.0,'2017-09-28 17:00:00','2017-09-30 17:00:00','GRENOBLE','GRENOBLE',55);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (56,2,4,19200.0,'2017-12-03 15:00:00','2017-12-07 15:00:00','GRENOBLE','GRENOBLE',56);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (57,4,4,4800.0,'2017-12-02 12:00:00','2017-12-03 12:00:00','GRENOBLE','GRENOBLE',57);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (58,3,4,19200.0,'2017-10-12 13:00:00','2017-10-16 13:00:00','GRENOBLE','GRENOBLE',58);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (59,4,4,19200.0,'2017-10-28 14:00:00','2017-11-01 14:00:00','GRENOBLE','GRENOBLE',59);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (60,3,4,9600.0,'2017-10-09 13:00:00','2017-10-11 13:00:00','GRENOBLE','GRENOBLE',60);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (61,3,7,268.8,'2017-12-03 11:00:00','2017-12-07 11:00:00','LYON','LYON',61);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (62,4,7,134.4,'2017-11-03 13:00:00','2017-11-05 13:00:00','LYON','LYON',62);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (63,2,7,67.2,'2017-11-01 16:00:00','2017-11-02 16:00:00','LYON','LYON',63);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (64,4,7,67.2,'2017-11-28 12:00:00','2017-11-29 12:00:00','LYON','LYON',64);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (65,2,7,67.2,'2017-11-29 13:00:00','2017-11-30 13:00:00','LYON','LYON',65);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (66,2,7,268.8,'2017-10-10 15:00:00','2017-10-14 15:00:00','LYON','LYON',66);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (67,2,6,1599.84,'2017-10-19 13:00:00','2017-10-20 13:00:00','LYON','LYON',67);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (68,2,6,4799.52,'2017-11-13 12:00:00','2017-11-16 12:00:00','LYON','LYON',68);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (69,4,6,6399.36,'2017-11-16 13:00:00','2017-11-20 13:00:00','LYON','LYON',69);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (70,2,6,6399.36,'2017-11-20 14:00:00','2017-11-24 14:00:00','LYON','LYON',70);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (71,2,6,4799.52,'2017-11-28 17:00:00','2017-12-01 17:00:00','LYON','LYON',71);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (72,2,6,4799.52,'2017-10-13 14:00:00','2017-10-16 14:00:00','LYON','LYON',72);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (73,2,6,4799.52,'2017-11-08 16:00:00','2017-11-11 16:00:00','LYON','LYON',73);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (74,4,6,1599.84,'2017-10-23 15:00:00','2017-10-24 15:00:00','LYON','LYON',74);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (75,3,6,3199.68,'2017-10-08 11:00:00','2017-10-10 11:00:00','LYON','LYON',75);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (76,3,6,3199.68,'2017-12-14 16:00:00','2017-12-16 16:00:00','LYON','LYON',76);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (77,2,6,6399.36,'2017-11-28 11:00:00','2017-12-02 11:00:00','LYON','LYON',77);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (78,3,6,4799.52,'2017-11-05 11:00:00','2017-11-08 11:00:00','LYON','LYON',78);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (79,2,6,1599.84,'2017-09-23 10:00:00','2017-09-24 10:00:00','LYON','LYON',79);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (80,3,6,6399.36,'2017-12-06 16:00:00','2017-12-10 16:00:00','LYON','LYON',80);

