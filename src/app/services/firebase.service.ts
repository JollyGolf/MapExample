import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Shawarma {
  id?: string,
  name: string,
  description: string,
  price: number
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private shawas: Observable<Shawarma[]>;
  private shawaCollection: AngularFirestoreCollection<Shawarma>;
 
  constructor(private afs: AngularFirestore) {
    this.shawaCollection = this.afs.collection<Shawarma>('shawas');
    this.shawas = this.shawaCollection.snapshotChanges().pipe(
      map(actions => actions.map(e => ({id: e.payload.doc.id, ...e.payload.doc.data()})))
    );
  }
 
  getShawas(): Observable<Shawarma[]> {
    return this.shawas;
  }
 
  getShawa(id: string): Observable<Shawarma> {
    return this.shawaCollection.doc<Shawarma>(id).valueChanges().pipe(
      take(1),
      map(shawa => {
        shawa.id = id;
        return shawa
      })
    );
  }
 
  addShawa(shawa: Shawarma): Promise<DocumentReference> {
    return this.shawaCollection.add(shawa);
  }
 
  updateShawa(shawa: Shawarma): Promise<void> {
    return this.shawaCollection.doc(shawa.id).update({ name: shawa.name, description: shawa.description, price: shawa.price});
  }
 
  deleteShawa(id: string): Promise<void> {
    return this.shawaCollection.doc(id).delete();
  }
}