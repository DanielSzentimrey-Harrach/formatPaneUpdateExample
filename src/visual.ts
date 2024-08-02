/*
*  Power BI Visual CLI
*
*  Copyright (c) Microsoft Corporation
*  All rights reserved.
*  MIT License
*
*  Permission is hereby granted, free of charge, to any person obtaining a copy
*  of this software and associated documentation files (the ""Software""), to deal
*  in the Software without restriction, including without limitation the rights
*  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
*  copies of the Software, and to permit persons to whom the Software is
*  furnished to do so, subject to the following conditions:
*
*  The above copyright notice and this permission notice shall be included in
*  all copies or substantial portions of the Software.
*
*  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
*  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
*  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
*  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
*  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
*  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
*  THE SOFTWARE.
*/
"use strict";

import powerbi from "powerbi-visuals-api";
import { FormattingSettingsService } from "powerbi-visuals-utils-formattingmodel";
import "./../style/visual.less";

import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;

import { VisualFormattingSettingsModel } from "./settings";
import { singletonInstance } from "./singleton";

export class Visual implements IVisual {
    private target: HTMLElement;
    private formattingSettings: VisualFormattingSettingsModel;
    private formattingSettingsService: FormattingSettingsService;
    private host: powerbi.extensibility.visual.IVisualHost;

    constructor(options: VisualConstructorOptions) {
        console.log("Constructor called...");
        this.formattingSettingsService = new FormattingSettingsService();
        this.target = options.element;
        this.host = options.host;
        console.log("Constructor completed!");
    }

    public update(options: VisualUpdateOptions) {
        console.log("Update called...");
        this.formattingSettings = this.formattingSettingsService.populateFormattingSettingsModel(VisualFormattingSettingsModel, options.dataViews[0]);

        this.target.textContent = '';
        
        const button = document.createElement('button');
        button.textContent = 'Populate dropdown values';
        button.onclick = () => {
            singletonInstance.values = [
                { displayName: 'First', value: 'first' },
                { displayName: 'Second', value: 'second' },
                { displayName: 'Third', value: 'third' }
            ]
            this.update(options);
        };
        this.target.appendChild(button);

        const div = document.createElement('div');
        div.textContent = "Value of dropdown array:";
        this.target.appendChild(div);

        const span = document.createElement('span');
        span.textContent = JSON.stringify(singletonInstance.values);
        this.target.appendChild(span);

        

        console.log("Update completed!");
    }

    /**
     * Returns properties pane formatting model content hierarchies, properties and latest formatting values, Then populate properties pane.
     * This method is called once every time we open properties pane or when the user edit any format property. 
     */
    public getFormattingModel(): powerbi.visuals.FormattingModel {
        console.log("GetCormattingModel called...");
        const a = this.formattingSettingsService.buildFormattingModel(this.formattingSettings);
        console.log("GetCormattingModel completed!");
        return a;
    }
}