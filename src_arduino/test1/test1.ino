const int red = 5;
const int green = 6;
const int blue = 7;
const int sensor = A0;
int value = 0;

void setup() {
  // put your setup code here, to run once:

  pinMode(red,OUTPUT);
  pinMode(green,OUTPUT);
  pinMode(blue,OUTPUT);

  
  digitalWrite(red,HIGH);
  digitalWrite(green,HIGH);
  digitalWrite(blue,HIGH);
  
  Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
  

  
  digitalWrite(red,HIGH);
  digitalWrite(green,HIGH);
  digitalWrite(blue,HIGH);
  delay(1000);

  value = analogRead(sensor);

  Serial.println(value);


  digitalWrite(red,LOW);
  digitalWrite(green,LOW);
  digitalWrite(blue,LOW);
  delay(1000);
  
  value = analogRead(sensor);

  Serial.println(value);

  
}
