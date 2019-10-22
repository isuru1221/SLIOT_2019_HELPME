

#include <TinyGPS++.h>//include the library code
#include <SoftwareSerial.h>//include the library code

#include <SPI.h>
#include <nRF24L01.h>
#include <RF24.h>



//*************************************************************

/* Pin Definitions*/
#define STATUS_RED 6
#define STATUS_GREEN 9
#define STATUS_BLUE 10
#define TRIG_BTN 2





TinyGPSPlus gps;// The TinyGPS++ object
SoftwareSerial ss(4, 3);// The serial connection to the GPS device

//create an RF24 object
RF24 radio(7, 8);  // CE, CSN

//address through which two modules communicate.
const byte addresses[][6] = {"00001", "00002"};
String deviceID = "1";

boolean isTrigged;
boolean isGSMnetworkAvailable;

String latlng[2] = {"", ""};
double latitude = 6.8998966, longitude = 79.8727526;


/*------------------------------------------------------------------------------------*/
void setup()
{
  Serial.begin(9600);
  ss.begin(9600);
  radio.begin();



  //  ticker.attach(0.6, tick_setup);

  pinMode(STATUS_RED, OUTPUT);
  pinMode(STATUS_GREEN, OUTPUT);
  pinMode(STATUS_BLUE, OUTPUT);
  pinMode(TRIG_BTN, INPUT);

  digitalWrite(STATUS_RED, HIGH);
  digitalWrite(STATUS_GREEN, HIGH);
  digitalWrite(STATUS_BLUE, HIGH);

  Serial.println(F("Setting Up..."));
  Serial.println(F("Waiting for Device to be Started..."));
  for (int i = 0; i < 10; i++) {
    Serial.print("#");
    delay(4000);
  }


  Serial.println(F("Clearing Serial Buffer..."));
  //Clear out any waiting serial data
  while (ss.available())
  {
    ss.read();
  }



  Serial.println(F("Checking Status LED..."));
  statusLEDTest();

  Serial.println(F("Setting Trigger Flag to False.."));
  isTrigged = false;
  Serial.println(F("Setting GSM Network Flag to True.."));
  isGSMnetworkAvailable = true;
  attachInterrupt(digitalPinToInterrupt(TRIG_BTN), afterTrigged, CHANGE);

  Serial.println(F("Initializing nRF24L01+ Module..."));
  radio.openWritingPipe(addresses[1]); // 00002
  radio.openReadingPipe(1, addresses[0]); // 00001
  //  radio.setPALevel(RF24_PA_MIN);

  Serial.println(F("A7 Module Starting..."));
  for (int i = 0; i < 10; i++) {
    ss.println("AT");
    delay(2000);
  }


  Serial.println(F("A7 Module -> Turning On GPS..."));
  ss.println("AT+GPS=1");
  delay(2000);
  ss.println("AT+GPSRD=1");
  delay(2000);

  Serial.println(F("Setup Finished"));
  //  ticker.detach();
  digitalWrite(STATUS_GREEN, LOW);


}

/*------------------------------------------------------------------------------------*/


void loop()
{

//  This sketch displays information every time a new sentence is correctly encoded.
  while (ss.available() > 0)
    if (gps.encode(ss.read()))
      displayInfo();

  if (isTrigged) {
    Serial.println(F("Device Triggered"));
    digitalWrite(STATUS_GREEN, HIGH);
    digitalWrite(STATUS_RED, LOW);

    char TempString[25];  //  Hold The Convert Data



    Serial.println(F("Getting Location..."));
    Serial.println(F(""));

    String tempStr = "";
    tempStr.concat(deviceID);

    dtostrf(latitude, 2, 6, TempString);
    // dtostrf( [doubleVar] , [sizeBeforePoint] , [sizeAfterPoint] , [WhereToStoreIt] )
    Serial.print(F("Location -> Latitude : "));
    Serial.print(String(TempString));
    tempStr.concat("#");
    tempStr.concat(String(TempString));
    Serial.println(F(""));
    dtostrf(longitude, 2, 6, TempString);
    // dtostrf( [doubleVar] , [sizeBeforePoint] , [sizeAfterPoint] , [WhereToStoreIt] )
    Serial.print(F("Location -> Longitude : "));
    Serial.print(TempString);
    tempStr.concat("#");
    tempStr.concat(String(TempString));
    Serial.println(F(""));
    Serial.println(tempStr);

    while (!isGSMnetworkAvailable) {
      nRFTransmit(tempStr.c_str());

    }

    if (isGSMnetworkAvailable) {
      //        callEmergency("94710521918");

      sendSMS();
      delay(1000);
      http();
      delay(10000);
    }
    


    isTrigged = false;
    digitalWrite(STATUS_RED, HIGH);
    digitalWrite(STATUS_GREEN, LOW);
  }





}



void nRFTransmit(char str[]) {


  //Set module as transmitter
  radio.stopListening();

  //Send message to receiver
  char data[32];
  strcpy(data, str);
  Serial.println(F("Sending Broadcast Message"));
  radio.write(&data, sizeof(data));

  delay(1000);
}

void nRFReceive() {

  //Set module as receiver
  radio.startListening();
  //Read the data if available in buffer
  if (radio.available())
  {
    Serial.println(F("Broadcast Signal Received : "));
    char messageData[32] = {0};
    radio.read(&messageData, sizeof(messageData));
    Serial.println(messageData);
  }
}

void afterTrigged() {
  isTrigged = true;
}

void sendSMS() {
  ss.println("AT+CSMP=17,167,0,0"); // Configuring TEXT mode
  delay(1000);
  ss.println("AT+CMGF=1"); // Configuring TEXT mode
  delay(1000);
  ss.println("AT+CMGS=\"+94779934216\"");
  delay(1000);
  ss.print("Accident happen at http://maps.google.com/maps?q=loc:");
  delay(1000);
  ss.write(char(26));
  delay(1000);
  ss.print(latitude);
  ss.print(",");
  ss.print (longitude);
  delay(200);
  ss.println((char)26);
}


void http() {
  ss.println("AT+SAPBR=3,1,\"Contype\",\"GPRS\"");
  delay(2000);
  ss.println("AT+SAPBR=3,1,\"APN\",\"AirtelLive\"");
  delay(2000);
  ss.println("AT+SAPBR =1,1");
  delay(5000);
  ss.println("AT+SAPBR=2,1");
  delay(5000);
  ss.println("AT+HTTPINIT");
  delay(5000);
  String message = "http://us-central1-nodemcu1-26fc3.cloudfunctions.net/Hardware?lat=" + String(latitude) + "&lon=" + String(longitude) + "&id=" + deviceID;
  ss.println("AT+HTTPPARA=\"URL\"," + message);
  delay(4000);
  ss.println("AT+HTTPACTION=0");
  delay(6000);
  ss.println("AT+HTTPREAD");
  delay(1000);
  ss.println("AT+HTTPTERM");
  delay(300);
  ss.println("");

}




void statusLEDTest() {

  int dTime = 500;

  digitalWrite(STATUS_RED, LOW);
  delay(dTime);
  digitalWrite(STATUS_RED, HIGH);
  delay(dTime);
  digitalWrite(STATUS_GREEN, LOW);
  delay(dTime);
  digitalWrite(STATUS_GREEN, HIGH);
  delay(dTime);
  digitalWrite(STATUS_BLUE, LOW);
  delay(dTime);
  digitalWrite(STATUS_BLUE, HIGH);
  delay(dTime);
}

void displayInfo()
{
  Serial.print(F("Location: "));
  if (gps.location.isValid())
  {
    latlng[0] = gps.location.lat();
    latlng[1] = gps.location.lng();
    latitude = gps.location.lat();
    longitude = gps.location.lng();
    Serial.print(gps.location.lat(), 6);
    Serial.print(F(","));
    Serial.print(gps.location.lng(), 6);
    digitalWrite(STATUS_BLUE, HIGH);
  }
  else
  {
    Serial.print(F("INVALID"));
    digitalWrite(STATUS_BLUE, LOW);
  }

  Serial.print(F("  Date/Time: "));
  if (gps.date.isValid())
  {
    Serial.print(gps.date.month());
    Serial.print(F("/"));
    Serial.print(gps.date.day());
    Serial.print(F("/"));
    Serial.print(gps.date.year());
  }
  else
  {
    Serial.print(F("INVALID"));
  }

  Serial.print(F(" "));
  if (gps.time.isValid())
  {
    if (gps.time.hour() < 10) Serial.print(F("0"));
    Serial.print(gps.time.hour());
    Serial.print(F(":"));
    if (gps.time.minute() < 10) Serial.print(F("0"));
    Serial.print(gps.time.minute());
    Serial.print(F(":"));
    if (gps.time.second() < 10) Serial.print(F("0"));
    Serial.print(gps.time.second());
    Serial.print(F("."));
    if (gps.time.centisecond() < 10) Serial.print(F("0"));
    Serial.print(gps.time.centisecond());
  }
  else
  {
    Serial.print(F("INVALID"));
  }

  Serial.println();
}

void callEmergency(String phoneNum) {

  ss.println("AT+GPSRD=0");
  delay(4000);

  String commandString = "";
  commandString.concat("ATD+");
  commandString.concat(phoneNum);


  Serial.println("Calling for Emergency Number...");
  ss.println(commandString);
  delay(20000);
  commandString = "ATH";
  ss.println(commandString);
  Serial.println("Call Hangged Out");
  delay(2000);

  ss.println("AT+GPSRD=1");
  delay(2000);

}

void tick()
{
  //toggle state
  int state = digitalRead(STATUS_BLUE);  // get the current state of GPIO1 pin
  digitalWrite(STATUS_BLUE, !state);     // set pin to the opposite state
}

void tick_setup()
{
  //toggle state
  int state = digitalRead(STATUS_GREEN);  // get the current state of GPIO1 pin
  digitalWrite(STATUS_GREEN, !state);     // set pin to the opposite state
}
