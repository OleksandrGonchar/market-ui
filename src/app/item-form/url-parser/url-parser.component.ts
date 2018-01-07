import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { ConfigObject } from './../interfaces/itemConfig.interface';

@Component({
  selector: 'url-parser',
  templateUrl: './url-parser.component.html',
  styles: []
})
export class UrlParserComponent {
  public parseUrlForm: FormGroup;

  @Output() public parsedConfig = new EventEmitter<ConfigObject>()

  constructor() {};

  private _notifyParent(configObject: ConfigObject): void {
    this.parsedConfig.emit(configObject);
  }

  private _createForm(): void {
    this.parseUrlForm = new FormGroup({
      formUrl: new FormControl()
    });
  }

  /**
   * Take id and group from url string
   */
  private _parseUrl(url:string): any {
    if (!url) { return; }
    const regex: RegExp = /https\:\/\/market\.csgo\.com\/item\//
    const urlWithoutAddres: string = url.replace(regex, '');
    const regexNumbers: RegExp = /\d+/;
    const id: string = regexNumbers.exec(urlWithoutAddres)[0];
    const group: string = regexNumbers.exec(urlWithoutAddres
      .replace(regexNumbers, '')
      .replace(/\-/, ''))[0];

    this._notifyParent({
      id,
      group
    })
  }

  public parseUrl(): void {
    this._parseUrl(this.parseUrlForm.get('formUrl').value);
  }

  ngOnInit() {
    this._createForm();
  };

  ngOnDestroy() {
  };
}
