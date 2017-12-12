

cd /media/data/Cours/Polytech/S9/ECOM/mesTransports/mes-transports
mvn clean install

cd /home/heloise/Téléchargements/wildfly-10.1.0.Final
rm -f ./standalone/deployments/mes-transports.war
cp /media/data/Cours/Polytech/S9/ECOM/mesTransports/mes-transports/target/mes-transports.war ./standalone/deployments/


./bin/standalone.sh
