### Compilar imagen Contenedor Oracle 19c

[Enlace a documentacion oficial](https://github.com/oracle/docker-images/tree/main/OracleDatabase/SingleInstance)

Navegar hasta la carpeta dockerfiles y construir la imagen con las siguientes instrucciones:

```./buildContainerImage.sh -h

Usage: buildContainerImage.sh -v [version] -t [image_name:tag] [-e | -s | -x] [-i] [-o] [container build option]
Builds a container image for Oracle Database.

Parameters:
   -v: version to build
       Choose one of: 11.2.0.2  12.1.0.2  12.2.0.1  18.3.0  18.4.0  19.3.0  21.3.0
   -t: image_name:tag for the generated docker image
   -e: creates image based on 'Enterprise Edition'
   -s: creates image based on 'Standard Edition 2'
   -x: creates image based on 'Express Edition'
   -i: ignores the MD5 checksums
   -o: passes on container build option

* select one edition only: -e, -s, or -x
```

## Comando para levantar el contenedor descargando la imagen direcata.

```
docker run --name oracle-21 \
-p 1521:1521 -p 5500:5500 \
-e ORACLE_SID=XE \
-e ORACLE_PWD=pass4oracle \
-v /home/vchamale/Documents/projects/oracle/oracle-database/oradata:/opt/oracle/oradata \
-v /home/vchamale/Documents/projects/oracle/oracle-database/scripts/startup:/opt/oracle/scripts/startup \
container-registry.oracle.com/database/express:21.3.0-xe
```
