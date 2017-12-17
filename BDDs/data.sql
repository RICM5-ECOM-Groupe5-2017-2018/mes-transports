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

INSERT INTO characteristic (id, unit, label, optional, rank, form, typeData) VALUES (1,'','Couleur',1,10,null,'str');
INSERT INTO characteristic (id, unit, label, optional, rank, form, typeData) VALUES (10,'','Immatriculation',0,1,null,'str');
INSERT INTO characteristic (id, unit, label, optional, rank, form, typeData) VALUES (3,'','Date construction',1,3,null,'str');
INSERT INTO characteristic (id, unit, label, optional, rank, form, typeData) VALUES (2,'','Marque',0,2,null,'str');
INSERT INTO characteristic (id, unit, label, optional, rank, form, typeData) VALUES (5,'kg','Poids',1,7,null,'float');
INSERT INTO characteristic (id, unit, label, optional, rank, form, typeData) VALUES (4,'km','Nombre de kilomètres',0,4,null,'float');
INSERT INTO characteristic (id, unit, label, optional, rank, form, typeData) VALUES (7,'','Date du dernier controle technique',0,6,null,'str');
INSERT INTO characteristic (id, unit, label, optional, rank, form, typeData) VALUES (6,'','Type Carburant',0,5,null,'str');
INSERT INTO characteristic (id, unit, label, optional, rank, form, typeData) VALUES (9,'','Nombre de portes',0,9,null,'int');
INSERT INTO characteristic (id, unit, label, optional, rank, form, typeData) VALUES (8,'','Nombre de places',0,8,null,'int');

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
INSERT INTO assign_characteristic (idVehicle, idCharacteristic, valueCharacteristic) VALUES (1,4,'indeterminable');
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

INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (1,7199.28,'CIC','...','ERTYUIHGVCD',3,3,'2017-12-05 13:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (2,9599.04,'CIC','...','ERTYUIHGVCD',3,3,'2017-10-15 10:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (3,2399.76,'CIC','...','ERTYUIHGVCD',3,3,'2017-11-11 14:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (4,2399.76,'CIC','...','ERTYUIHGVCD',3,3,'2017-10-02 12:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (5,4799.52,'LCL','...','MLKJNBFGYUI',3,2,'2017-12-02 16:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (6,2399.76,'LCL','...','MLKJNBFGYUI',3,2,'2017-11-18 17:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (7,7199.28,'BNP','...','DFGLRGJFGYU',3,4,'2017-10-27 17:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (8,4799.52,'CIC','...','ERTYUIHGVCD',3,3,'2017-10-04 13:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (9,9599.04,'CIC','...','ERTYUIHGVCD',3,3,'2017-12-13 17:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (10,9599.04,'CIC','...','ERTYUIHGVCD',3,3,'2017-11-26 11:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (11,2399.76,'CIC','...','ERTYUIHGVCD',3,3,'2017-12-11 13:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (12,9599.04,'BNP','...','DFGLRGJFGYU',3,4,'2017-10-27 16:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (13,7199.28,'LCL','...','MLKJNBFGYUI',3,2,'2017-10-08 10:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (14,40.32,'CIC','...','ERTYUIHGVCD',2,3,'2017-11-22 10:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (15,40.32,'LCL','...','MLKJNBFGYUI',2,2,'2017-12-04 14:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (16,40.32,'BNP','...','DFGLRGJFGYU',2,4,'2017-11-18 12:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (17,53.76,'LCL','...','MLKJNBFGYUI',2,2,'2017-10-19 11:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (18,26.88,'CIC','...','ERTYUIHGVCD',2,3,'2017-12-10 12:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (19,4165.44,'LCL','...','MLKJNBFGYUI',1,2,'2017-10-16 14:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (20,6248.16,'CIC','...','ERTYUIHGVCD',1,3,'2017-10-29 15:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (21,8330.88,'LCL','...','MLKJNBFGYUI',1,2,'2017-12-08 12:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (22,6248.16,'CIC','...','ERTYUIHGVCD',1,3,'2017-11-25 14:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (23,8330.88,'LCL','...','MLKJNBFGYUI',1,2,'2017-11-17 16:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (24,2082.72,'LCL','...','MLKJNBFGYUI',1,2,'2017-12-03 12:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (25,2082.72,'BNP','...','DFGLRGJFGYU',1,4,'2017-12-04 17:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (26,4165.44,'BNP','...','DFGLRGJFGYU',1,4,'2017-10-24 16:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (27,2082.72,'CIC','...','ERTYUIHGVCD',1,3,'2017-10-02 15:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (28,2082.72,'LCL','...','MLKJNBFGYUI',1,2,'2017-10-14 16:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (29,4165.44,'BNP','...','DFGLRGJFGYU',1,4,'2017-11-05 12:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (30,4165.44,'LCL','...','MLKJNBFGYUI',1,2,'2017-09-29 11:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (31,6248.16,'LCL','...','MLKJNBFGYUI',1,2,'2017-09-28 12:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (32,16800.0,'BNP','...','DFGLRGJFGYU',3,4,'2017-11-24 10:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (33,50400.0,'LCL','...','MLKJNBFGYUI',3,2,'2017-12-14 13:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (34,33600.0,'LCL','...','MLKJNBFGYUI',3,2,'2017-11-16 10:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (35,16800.0,'CIC','...','ERTYUIHGVCD',3,3,'2017-10-15 15:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (36,33600.0,'LCL','...','MLKJNBFGYUI',3,2,'2017-10-10 11:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (37,16800.0,'BNP','...','DFGLRGJFGYU',3,4,'2017-10-04 11:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (38,50400.0,'CIC','...','ERTYUIHGVCD',3,3,'2017-11-10 14:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (39,33600.0,'LCL','...','MLKJNBFGYUI',3,2,'2017-09-22 17:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (40,50400.0,'LCL','...','MLKJNBFGYUI',3,2,'2017-12-08 10:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (41,16800.0,'CIC','...','ERTYUIHGVCD',3,3,'2017-12-05 11:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (42,50400.0,'BNP','...','DFGLRGJFGYU',3,4,'2017-10-05 16:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (43,33600.0,'CIC','...','ERTYUIHGVCD',3,3,'2017-09-25 14:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (44,19200.0,'BNP','...','DFGLRGJFGYU',1,4,'2017-09-25 16:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (45,9600.0,'LCL','...','MLKJNBFGYUI',1,2,'2017-11-05 15:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (46,19200.0,'CIC','...','ERTYUIHGVCD',1,3,'2017-11-09 11:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (47,9600.0,'CIC','...','ERTYUIHGVCD',1,3,'2017-10-12 15:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (48,9600.0,'CIC','...','ERTYUIHGVCD',1,3,'2017-10-03 16:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (49,9600.0,'CIC','...','ERTYUIHGVCD',1,3,'2017-10-30 10:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (50,4800.0,'LCL','...','MLKJNBFGYUI',1,2,'2017-12-05 13:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (51,4800.0,'LCL','...','MLKJNBFGYUI',1,2,'2017-11-22 11:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (52,268.8,'BNP','...','DFGLRGJFGYU',2,4,'2017-12-02 12:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (53,134.4,'BNP','...','DFGLRGJFGYU',2,4,'2017-12-07 17:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (54,268.8,'CIC','...','ERTYUIHGVCD',2,3,'2017-11-13 13:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (55,134.4,'LCL','...','MLKJNBFGYUI',2,2,'2017-10-03 17:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (56,268.8,'CIC','...','ERTYUIHGVCD',2,3,'2017-09-24 10:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (57,67.2,'BNP','...','DFGLRGJFGYU',2,4,'2017-10-25 17:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (58,67.2,'LCL','...','MLKJNBFGYUI',2,2,'2017-10-22 11:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (59,134.4,'CIC','...','ERTYUIHGVCD',2,3,'2017-10-19 17:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (60,67.2,'BNP','...','DFGLRGJFGYU',2,4,'2017-11-19 11:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (61,134.4,'LCL','...','MLKJNBFGYUI',2,2,'2017-11-08 14:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (62,268.8,'BNP','...','DFGLRGJFGYU',2,4,'2017-11-22 11:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (63,134.4,'LCL','...','MLKJNBFGYUI',2,2,'2017-10-09 13:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (64,201.6,'BNP','...','DFGLRGJFGYU',2,4,'2017-12-07 10:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (65,4799.52,'CIC','...','ERTYUIHGVCD',2,3,'2017-11-28 15:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (66,1599.84,'BNP','...','DFGLRGJFGYU',2,4,'2017-12-12 14:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (67,1599.84,'LCL','...','MLKJNBFGYUI',2,2,'2017-09-24 14:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (68,1599.84,'LCL','...','MLKJNBFGYUI',2,2,'2017-11-09 15:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (69,3199.68,'CIC','...','ERTYUIHGVCD',2,3,'2017-11-12 13:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (70,3199.68,'BNP','...','DFGLRGJFGYU',2,4,'2017-11-25 11:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (71,3199.68,'LCL','...','MLKJNBFGYUI',2,2,'2017-11-20 12:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (72,4799.52,'CIC','...','ERTYUIHGVCD',2,3,'2017-11-12 10:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (73,6399.36,'BNP','...','DFGLRGJFGYU',2,4,'2017-10-07 15:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (74,6399.36,'LCL','...','MLKJNBFGYUI',2,2,'2017-10-16 14:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (75,1599.84,'CIC','...','ERTYUIHGVCD',2,3,'2017-11-17 10:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (76,1599.84,'LCL','...','MLKJNBFGYUI',2,2,'2017-12-09 16:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (77,1599.84,'BNP','...','DFGLRGJFGYU',2,4,'2017-10-01 10:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (78,6399.36,'BNP','...','DFGLRGJFGYU',2,4,'2017-12-09 15:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (79,6399.36,'BNP','...','DFGLRGJFGYU',2,4,'2017-11-11 12:00:00',0);
INSERT INTO transaction (id, amount, bankName, description, rib, agency_id, user_id, str_date, user) VALUES (80,1599.84,'BNP','...','DFGLRGJFGYU',2,4,'2017-10-29 13:00:00',0);

#====================================================================================================#
#================================================rent================================================#
#====================================================================================================#

INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (1,3,1,7199.28,'2017-12-05 13:00:00','2017-12-08 13:00:00','GRENOBLE','GRENOBLE',1);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (2,3,1,9599.04,'2017-10-15 10:00:00','2017-10-19 10:00:00','GRENOBLE','GRENOBLE',2);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (3,3,1,2399.76,'2017-11-11 14:00:00','2017-11-12 14:00:00','GRENOBLE','GRENOBLE',3);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (4,3,1,2399.76,'2017-10-02 12:00:00','2017-10-03 12:00:00','GRENOBLE','GRENOBLE',4);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (5,2,1,4799.52,'2017-12-02 16:00:00','2017-12-04 16:00:00','GRENOBLE','GRENOBLE',5);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (6,2,1,2399.76,'2017-11-18 17:00:00','2017-11-19 17:00:00','GRENOBLE','GRENOBLE',6);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (7,4,1,7199.28,'2017-10-27 17:00:00','2017-10-30 17:00:00','GRENOBLE','GRENOBLE',7);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (8,3,1,4799.52,'2017-10-04 13:00:00','2017-10-06 13:00:00','GRENOBLE','GRENOBLE',8);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (9,3,1,9599.04,'2017-12-13 17:00:00','2017-12-17 17:00:00','GRENOBLE','GRENOBLE',9);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (10,3,1,9599.04,'2017-11-26 11:00:00','2017-11-30 11:00:00','GRENOBLE','GRENOBLE',10);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (11,3,1,2399.76,'2017-12-11 13:00:00','2017-12-12 13:00:00','GRENOBLE','GRENOBLE',11);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (12,4,1,9599.04,'2017-10-27 16:00:00','2017-10-31 16:00:00','GRENOBLE','GRENOBLE',12);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (13,2,1,7199.28,'2017-10-08 10:00:00','2017-10-11 10:00:00','GRENOBLE','GRENOBLE',13);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (14,3,3,40.32,'2017-11-22 10:00:00','2017-11-25 10:00:00','LYON','LYON',14);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (15,2,3,40.32,'2017-12-04 14:00:00','2017-12-07 14:00:00','LYON','LYON',15);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (16,4,3,40.32,'2017-11-18 12:00:00','2017-11-21 12:00:00','LYON','LYON',16);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (17,2,3,53.76,'2017-10-19 11:00:00','2017-10-23 11:00:00','LYON','LYON',17);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (18,3,3,26.88,'2017-12-10 12:00:00','2017-12-12 12:00:00','LYON','LYON',18);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (19,2,2,4165.44,'2017-10-16 14:00:00','2017-10-18 14:00:00','GRENOBLE','GRENOBLE',19);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (20,3,2,6248.16,'2017-10-29 15:00:00','2017-11-01 15:00:00','GRENOBLE','GRENOBLE',20);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (21,2,2,8330.88,'2017-12-08 12:00:00','2017-12-12 12:00:00','GRENOBLE','GRENOBLE',21);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (22,3,2,6248.16,'2017-11-25 14:00:00','2017-11-28 14:00:00','GRENOBLE','GRENOBLE',22);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (23,2,2,8330.88,'2017-11-17 16:00:00','2017-11-21 16:00:00','GRENOBLE','GRENOBLE',23);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (24,2,2,2082.72,'2017-12-03 12:00:00','2017-12-04 12:00:00','GRENOBLE','GRENOBLE',24);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (25,4,2,2082.72,'2017-12-04 17:00:00','2017-12-05 17:00:00','GRENOBLE','GRENOBLE',25);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (26,4,2,4165.44,'2017-10-24 16:00:00','2017-10-26 16:00:00','GRENOBLE','GRENOBLE',26);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (27,3,2,2082.72,'2017-10-02 15:00:00','2017-10-03 15:00:00','GRENOBLE','GRENOBLE',27);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (28,2,2,2082.72,'2017-10-14 16:00:00','2017-10-15 16:00:00','GRENOBLE','GRENOBLE',28);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (29,4,2,4165.44,'2017-11-05 12:00:00','2017-11-07 12:00:00','GRENOBLE','GRENOBLE',29);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (30,2,2,4165.44,'2017-09-29 11:00:00','2017-10-01 11:00:00','GRENOBLE','GRENOBLE',30);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (31,2,2,6248.16,'2017-09-28 12:00:00','2017-10-01 12:00:00','GRENOBLE','GRENOBLE',31);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (32,4,5,16800.0,'2017-11-24 10:00:00','2017-11-25 10:00:00','GRENOBLE','GRENOBLE',32);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (33,2,5,50400.0,'2017-12-14 13:00:00','2017-12-17 13:00:00','GRENOBLE','GRENOBLE',33);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (34,2,5,33600.0,'2017-11-16 10:00:00','2017-11-18 10:00:00','GRENOBLE','GRENOBLE',34);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (35,3,5,16800.0,'2017-10-15 15:00:00','2017-10-16 15:00:00','GRENOBLE','GRENOBLE',35);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (36,2,5,33600.0,'2017-10-10 11:00:00','2017-10-12 11:00:00','GRENOBLE','GRENOBLE',36);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (37,4,5,16800.0,'2017-10-04 11:00:00','2017-10-05 11:00:00','GRENOBLE','GRENOBLE',37);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (38,3,5,50400.0,'2017-11-10 14:00:00','2017-11-13 14:00:00','GRENOBLE','GRENOBLE',38);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (39,2,5,33600.0,'2017-09-22 17:00:00','2017-09-24 17:00:00','GRENOBLE','GRENOBLE',39);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (40,2,5,50400.0,'2017-12-08 10:00:00','2017-12-11 10:00:00','GRENOBLE','GRENOBLE',40);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (41,3,5,16800.0,'2017-12-05 11:00:00','2017-12-06 11:00:00','GRENOBLE','GRENOBLE',41);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (42,4,5,50400.0,'2017-10-05 16:00:00','2017-10-08 16:00:00','GRENOBLE','GRENOBLE',42);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (43,3,5,33600.0,'2017-09-25 14:00:00','2017-09-27 14:00:00','GRENOBLE','GRENOBLE',43);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (44,4,4,19200.0,'2017-09-25 16:00:00','2017-09-29 16:00:00','GRENOBLE','GRENOBLE',44);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (45,2,4,9600.0,'2017-11-05 15:00:00','2017-11-07 15:00:00','GRENOBLE','GRENOBLE',45);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (46,3,4,19200.0,'2017-11-09 11:00:00','2017-11-13 11:00:00','GRENOBLE','GRENOBLE',46);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (47,3,4,9600.0,'2017-10-12 15:00:00','2017-10-14 15:00:00','GRENOBLE','GRENOBLE',47);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (48,3,4,9600.0,'2017-10-03 16:00:00','2017-10-05 16:00:00','GRENOBLE','GRENOBLE',48);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (49,3,4,9600.0,'2017-10-30 10:00:00','2017-11-01 10:00:00','GRENOBLE','GRENOBLE',49);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (50,2,4,4800.0,'2017-12-05 13:00:00','2017-12-06 13:00:00','GRENOBLE','GRENOBLE',50);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (51,2,4,4800.0,'2017-11-22 11:00:00','2017-11-23 11:00:00','GRENOBLE','GRENOBLE',51);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (52,4,7,268.8,'2017-12-02 12:00:00','2017-12-06 12:00:00','LYON','LYON',52);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (53,4,7,134.4,'2017-12-07 17:00:00','2017-12-09 17:00:00','LYON','LYON',53);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (54,3,7,268.8,'2017-11-13 13:00:00','2017-11-17 13:00:00','LYON','LYON',54);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (55,2,7,134.4,'2017-10-03 17:00:00','2017-10-05 17:00:00','LYON','LYON',55);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (56,3,7,268.8,'2017-09-24 10:00:00','2017-09-28 10:00:00','LYON','LYON',56);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (57,4,7,67.2,'2017-10-25 17:00:00','2017-10-26 17:00:00','LYON','LYON',57);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (58,2,7,67.2,'2017-10-22 11:00:00','2017-10-23 11:00:00','LYON','LYON',58);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (59,3,7,134.4,'2017-10-19 17:00:00','2017-10-21 17:00:00','LYON','LYON',59);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (60,4,7,67.2,'2017-11-19 11:00:00','2017-11-20 11:00:00','LYON','LYON',60);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (61,2,7,134.4,'2017-11-08 14:00:00','2017-11-10 14:00:00','LYON','LYON',61);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (62,4,7,268.8,'2017-11-22 11:00:00','2017-11-26 11:00:00','LYON','LYON',62);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (63,2,7,134.4,'2017-10-09 13:00:00','2017-10-11 13:00:00','LYON','LYON',63);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (64,4,7,201.6,'2017-12-07 10:00:00','2017-12-10 10:00:00','LYON','LYON',64);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (65,3,6,4799.52,'2017-11-28 15:00:00','2017-12-01 15:00:00','LYON','LYON',65);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (66,4,6,1599.84,'2017-12-12 14:00:00','2017-12-13 14:00:00','LYON','LYON',66);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (67,2,6,1599.84,'2017-09-24 14:00:00','2017-09-25 14:00:00','LYON','LYON',67);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (68,2,6,1599.84,'2017-11-09 15:00:00','2017-11-10 15:00:00','LYON','LYON',68);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (69,3,6,3199.68,'2017-11-12 13:00:00','2017-11-14 13:00:00','LYON','LYON',69);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (70,4,6,3199.68,'2017-11-25 11:00:00','2017-11-27 11:00:00','LYON','LYON',70);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (71,2,6,3199.68,'2017-11-20 12:00:00','2017-11-22 12:00:00','LYON','LYON',71);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (72,3,6,4799.52,'2017-11-12 10:00:00','2017-11-15 10:00:00','LYON','LYON',72);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (73,4,6,6399.36,'2017-10-07 15:00:00','2017-10-11 15:00:00','LYON','LYON',73);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (74,2,6,6399.36,'2017-10-16 14:00:00','2017-10-20 14:00:00','LYON','LYON',74);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (75,3,6,1599.84,'2017-11-17 10:00:00','2017-11-18 10:00:00','LYON','LYON',75);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (76,2,6,1599.84,'2017-12-09 16:00:00','2017-12-10 16:00:00','LYON','LYON',76);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (77,4,6,1599.84,'2017-10-01 10:00:00','2017-10-02 10:00:00','LYON','LYON',77);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (78,4,6,6399.36,'2017-12-09 15:00:00','2017-12-13 15:00:00','LYON','LYON',78);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (79,4,6,6399.36,'2017-11-11 12:00:00','2017-11-15 12:00:00','LYON','LYON',79);
INSERT INTO rent (id, idUser, idVehicle, total_price, start_date, end_date, location_in, location_out, transactions)VALUES (80,4,6,1599.84,'2017-10-29 13:00:00','2017-10-30 13:00:00','LYON','LYON',80);

