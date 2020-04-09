import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import {
  ICommandPalette, MainAreaWidget
} from '@jupyterlab/apputils';

import{
  Widget
} from '@lumino/widgets';
/**
 * Initialization data for the jupyterlab_rec extension.
 */

const extension: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-rec',
  autoStart: true,
  requires: [ICommandPalette],
  activate: async (app: JupyterFrontEnd, palette: ICommandPalette) => {
    console.log('JupyterLab extension jupyterlab-rec is activated!');
    // Create a blank content widget inside of a MainAreaWidget
    const content = new Widget();
    const widget = new MainAreaWidget({content});
    widget.id = 'rec-jupyterlab';
    widget.title.label = 'Rectangle Picture';
    widget.title.closable = true;
    
    // Add an image element to the content
    let img = document.createElement('img');
    content.node.appendChild(img);

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.rect(10, 20, 150, 100);
    ctx.fill();

    // Add an application command
    const command: string = 'rec:open';
    app.commands.addCommand(command, {
    label: 'Random Rectangle Picture',
    execute: () => {
      if (!widget.isAttached) {
        // Attach the widget to the main work area if it's not there
        app.shell.add(widget, 'main');
      }
      // Activate the widget
      app.shell.activateById(widget.id);
    }
  });

  // Add the command to the palette.
  palette.addItem({command, category: 'Tutorial'});
  }
};

export default extension;
