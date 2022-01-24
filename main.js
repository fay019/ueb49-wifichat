const { app, BrowserWindow, screen, Menu, shell, ipcMain } = require( 'electron' );
require('dotenv').config()

// config
const DEVMODE = true;
let meinFenster;
let myHeight = process.env.APP_HEIGHT;
let  myWidth = process.env.APP_WIDTH;


let myX, myY;
/**
 * User Menu
 * @type {[{label: string, click: click},{label: string, click: click}]}
 */
let meinMenu = [
    {
        label:'Beenden', click:() => {
            app.quit();
            shell.beep();
        }
    },
    {
        label:'Refresh', role: 'reload'
    },
];
/**
 * Dev Menu
 * @type {[{submenu: [{label: string, click: click},{role: string, label: string}], label: string},{label: string, click: click},{label: string, click: click}]}
 */
let meinDevMenu = [
        {
            label:'Beenden', click:() => {
                app.quit();
                shell.beep();
            }
        },
        {
            label:'Dev-Tools', role:'toggleDevTools'
        },
        {
            label:'Refresh', role: 'reload'
        },
];
//end config

const starteApplikation = () => {
    let factor = screen.getAllDisplays();
    myX = factor[ 1 ].size.width - myWidth;
    myY = factor[ 1 ].size.height - myHeight;
    meinFenster = new BrowserWindow( {
        width:myWidth,
        height:myHeight,
        x:myX,
        y:myY,
        // resizable:false,
        movable:true,
        //transparent: true,
        frame:true,
        icon:__dirname + '/assets/csv-icon.png',
        webPreferences:{
            nodeIntegration:true, //standard false
            contextIsolation:false,
            devTools:DEVMODE // false in published
        },
        //icon: __dirname
    } );
    meinFenster.loadFile( 'view/index.html' );
    if ( DEVMODE ) {
        meinFenster.webContents.openDevTools(); // auto open devtools
        Menu.setApplicationMenu( Menu.buildFromTemplate( meinDevMenu ) );
        meinFenster.setAlwaysOnTop( true );
    }else {
        Menu.setApplicationMenu( Menu.buildFromTemplate( meinMenu ) );
    }
};


app.on( 'ready', starteApplikation );

//- MacOS
app.on( 'window-all-closed', () => {
    app.quit(); //Beende Applikation
} )
app.on( 'active', starteApplikation )

//+ MacOS
