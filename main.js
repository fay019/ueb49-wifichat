const { app, BrowserWindow, screen, Menu, shell, ipcMain } = require( 'electron' );
require('dotenv').config()

// config
const DEVMODE = process.env.APP_DEVTOOLS;
let myHeight = process.env.APP_HEIGHT;
let myWidth = process.env.APP_WIDTH;
let meinFenster;
let myX, myY;


/**
 * User Menu
 * @type {[{label: string, click: click},{label: string, click: click}]}
 */
let userMenu = [
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
let devMenu = [
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
        icon:__dirname + '/assets/chat.png',
        webPreferences:{
            nodeIntegration:true, //standard false
            contextIsolation:false,
            devTools:DEVMODE // false in published
        },
    } );
    meinFenster.loadFile( 'view/index.html' );
    if ( DEVMODE ) {
        meinFenster.webContents.openDevTools(); // auto open devtools
        Menu.setApplicationMenu( Menu.buildFromTemplate( devMenu ) );
        meinFenster.setAlwaysOnTop( true );
    }else {
        Menu.setApplicationMenu( Menu.buildFromTemplate( userMenu ) );
    }
};


app.on( 'ready', starteApplikation );

//- MacOS
app.on( 'window-all-closed', () => {
    app.quit(); //Beende Applikation
} )
app.on( 'active', starteApplikation )

//+ MacOS
