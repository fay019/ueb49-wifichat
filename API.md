# 010Superchat Server

## Stacic Ordner muss 'www' heißen


## Registrieren
### Request
URL: http://localhost:5001/user
Method: post
data: {
    vorname: 'User name',
    nachname: 'User nachname',
    nickname: 'Nickname',
    passwort: 'Passwort'
}
### Response
message: message


## Aktualisieren
### Request
URL: http://localhost:5001/user/userId
Method: put
data: {
    vorname: 'User name',
    nachname: 'User nachname',
    nickname: 'Nickname',
    passwort: 'Passwort'
}
### Response
message: message


## User bekommen
### Request
URL: http://localhost:5001/user
Method: get
### Response
JSON