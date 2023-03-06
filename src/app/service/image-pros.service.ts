import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from '../model/file-handle.model';
import { Produit } from '../model/Produit';

@Injectable({
  providedIn: 'root'
})
export class ImageProsService {

  constructor(private sanitizer: DomSanitizer) { }

  public createImage(product:Produit){
    const productImages:any[] = product.productImages;
    const productImagesToFileHandle: FileHandle[]= [];

    for(let i=0;i < productImages.length; i++){
      const imageFileData = productImages[i];
    const imageBlob = this.dataURItoBlog(imageFileData.picByte,imageFileData.type);

     const imageFile= new File([imageBlob],imageFileData.name, {type: imageFileData.type});

      const finalFileHandle:FileHandle = {
            file: imageFile,
            url: this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(imageFile))
      };

      productImagesToFileHandle.push(finalFileHandle);

    }

    product.productImages = productImagesToFileHandle;
    return product;

  }


  public dataURItoBlog(picByte,imageType){
    const byteString = window.atob(picByte);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for (let i =0;i <byteString.length; i++){
        int8Array[i] = byteString.charCodeAt(i);
    }

   const blob =  new Blob([int8Array], {type: imageType})

   return blob

  }
}
