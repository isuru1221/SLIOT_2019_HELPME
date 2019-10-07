#include <SPI.h>
#include <nRF24L01.h>
#include <RF24.h>

#include <SoftwareSerial.h>

//GPS
#include <TinyGPS++.h>


TinyGPSPlus gps;
SoftwareSerial GPS(4, 5);

//create an RF24 object
RF24 radio(7, 8);  // CE, CSN
//address through which two modules communicate.
const byte address[6] = "node1";


char latitude[] = "709.03294234297890";
char longitude[] = "690.2342348988990";

void setup() {
  Serial.begin(9600);
  radio.begin();
  //  GPS.begin(9600);
  //  Serial.print(">>> GPS Connecting...");
  //  int i = 0;
  //  for (i = 0; i < 20; i++) {
  //    delay(100);
  //    Serial.print(".");
  //  }
  //  Serial.print(">>> GPS Connected...");

}

void loop() {
  // put your main code here, to run repeatedly:
  //  getGPSLocation();
  
    char text[] = "nRF24L01+ Testing...";
    rfTransmit(latitude, longitude );

  
}

void getGPSLocation() {

  while (GPS.available() > 0) {
    if (gps.encode(GPS.read()))
      displayData();
  }

  if ( millis() > 5000 && gps.charsProcessed() < 10) {
    Serial.println(F("No GPS detected: check wiring."));
    while (true);
  }

  delay(100);
}

void displayData()
{
  Serial.print(F("Location: "));
  if (gps.location.isValid()) {
    Serial.print(gps.location.lat(), 6);
    Serial.print(F(","));
    Serial.print(gps.location.lng(), 6);
  } else {
    Serial.print(F("INVALID"));
  }

  Serial.print(F("  Date: "));
  if (gps.date.isValid()) {
    Serial.print(gps.date.month());
    Serial.print(F("/"));
    Serial.print(gps.date.day());
    Serial.print(F("/"));
    Serial.print(gps.date.year());
  } else {
    Serial.print(F("INVALID DATE"));
  }

  Serial.print(F("  Time: "));
  if (gps.time.isValid()) {
    if (gps.time.hour() < 10)
      Serial.print(F("0"));
    Serial.print(gps.time.hour());
    Serial.print(F(":"));

    if (gps.time.minute() < 10)
      Serial.print(F("0"));
    Serial.print(gps.time.minute());
    Serial.print(F(":"));

    if (gps.time.second() < 10)
      Serial.print(F("0"));
    Serial.print(gps.time.second());
    Serial.print(F("."));

    if (gps.time.centisecond() < 10)
      Serial.print(F("0"));
    Serial.print(gps.time.centisecond());
  } else {
    Serial.print(F("INVALID TIME"));
  }

  Serial.println();

}

void rfTransmit(char latitude[], char longitude[]) {

String locationString = "";
locationString.concat(latitude);
locationString.concat("+");
locationString.concat(longitude);

Serial.println(locationString);
//set the address
  radio.openWritingPipe(address);
  
  //Set module as transmitter
  radio.stopListening();
  //Send message to receiver
  char text[64] = "";
  strcpy(text, locationString.c_str());
  
  if (radio.write(&text, sizeof(text)) == true) {

    Serial.println("Transmission Success");

  }
  else {
    Serial.println("Transmission Failed");
  }
  
  delay(1000);
}
