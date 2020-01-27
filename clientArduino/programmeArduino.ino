const int red = 5;
const int green = 6;
const int blue = 7;
const int sensor = A0;
int value = 0;

int whiteLED[] = {5, 6, 7};
volatile bool shutdownFlag = false;

void setup() {
  // put your setup code here, to run once:

  //Initialisation of PIN mode
  pinMode(red,OUTPUT);
  pinMode(green,OUTPUT);
  pinMode(blue,OUTPUT);

  //Initialisation of the out put
  setMultiDigitalPin(3, whiteLED, HIGH);
  
  //Initialisation of serial communication and send start message
  Serial.begin(9600);
  Serial.println("Arduino is ready");
}

void loop() {
  
  //Wait for the server
  if(Serial.available() > 0) {
    
    while(!shutdownFlag){
      
      //Get message from Serveur
      String ms= Serial.readString();

      //Launch Action
      launchAction(ms);      
    }
  }
}

String getAnalogueValue(int addrPin){
  String result = "";
  if(addrPin == A0 || addrPin == A0 || addrPin == A1 || addrPin == A2 || addrPin == A3 || addrPin == A4 || addrPin == A5){
    result = String(analogRead(sensor));  
  }  
  return result;
}

void setDigitalPin(int addrPin, int value){
  digitalWrite(addrPin, value);
}

void setMultiDigitalPin(int nbrPin, int* addrPin, int value){
  for(int i = 0; i < nbrPin; i++){
    setDigitalPin(addrPin[i], value);
  }  
}

void launchAction(String instruction){
  String answer = "done";
  
  //str1.compare(str2) == 0
  if(instruction == "GET_VALUE"){
    answer = "{\"value\":" + getAnalogueValue(sensor) + "}";
  }
  else if (instruction == "SET_LIGHT_UP"){
    setMultiDigitalPin(3, whiteLED, HIGH);
    //delay(10);
  } 
  else if (instruction == "SET_LIGHT_DOWN"){
    setMultiDigitalPin(3, whiteLED, LOW);
    //delay(10);
  }  
  else if (instruction == "SHUTDOWN"){
    setMultiDigitalPin(3, whiteLED, LOW);
    //delay(10);
    shutdownFlag = true;
  }
  
  Serial.println(answer);
}
