FROM  maven:3.6.3-jdk-11 as builder
COPY src /usr/src/app/src
COPY pom.xml /usr/src/app
RUN mvn -f /usr/src/app/pom.xml clean package

FROM adoptopenjdk/openjdk11:latest
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/target/api-dummy-0.0.1-SNAPSHOT.jar /usr/src/app/app.jar  
COPY --from=builder /usr/src/app/pom.xml /usr/src/app/pom.xml
COPY --from=builder /usr/src/app/src /usr/src/app/src
EXPOSE 5000 
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/usr/src/app/app.jar"] 
