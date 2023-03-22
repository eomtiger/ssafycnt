plugins {
	java
	id("org.springframework.boot") version "2.7.9"
	id("io.spring.dependency-management") version "1.0.15.RELEASE"
}

group = "com.example"
version = "0.0.1-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_1_8

configurations {
	compileOnly {
		extendsFrom(configurations.annotationProcessor.get())
	}
}

repositories {
	mavenCentral()
	maven("https://jitpack.io")
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-batch")
	implementation("org.springframework.boot:spring-boot-starter-web")
	compileOnly("org.projectlombok:lombok")
	developmentOnly("org.springframework.boot:spring-boot-devtools")
	runtimeOnly("com.h2database:h2")
	annotationProcessor("org.projectlombok:lombok")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testImplementation("org.springframework.batch:spring-batch-test")
	// 크롤링
	implementation("org.jsoup:jsoup:1.15.4")
	// KOMORAN
	implementation("com.github.shin285:KOMORAN:3.3.4")
	// JPA Hibernate
	implementation("org.hibernate:hibernate-entitymanager:5.3.10.Final")
	// JPA
	implementation("org.springframework.boot:spring-boot-starter-data-jpa")
	// JDBC
	implementation("org.springframework.boot:spring-boot-starter-jdbc")
	// H2 database
	implementation("com.h2database:h2:2.1.214")

}

tasks.withType<Test> {
	useJUnitPlatform()
}
