import { useEffect, useState } from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonFooter, IonTabBar, IonTabButton, IonIcon } from "@ionic/react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { book, informationCircle, logOut } from 'ionicons/icons';

const BookList: React.FC = () => {
  const [books, setBooks] = useState<{ id: string; title: string; author: string }[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const booksCollection = collection(db, "books");
      const bookSnapshot = await getDocs(booksCollection);
      const bookList = bookSnapshot.docs.map((doc) => {
        console.log("Document Data:", doc.data());
  
        return {
          id: doc.id,
          title: doc.data().Title,
          author: doc.data().Author,
          description: doc.data().Description,
        };
      });
  
      console.log("Fetched Books:", bookList);
  
      setBooks(bookList);
    };
  
    fetchBooks();
  }, []);
  

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Book List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {books.length > 0 ? (
            books.map((book) => (
              <IonItem key={book.id}>
                <IonLabel>
                  <h2>{book.title || "Untitled"}</h2>
                  <p>{book.author ? `by ${book.author}` : "Author Unknown"}</p>
                </IonLabel>
              </IonItem>
            ))
          ) : (
            <IonItem>
              <IonLabel>No books found</IonLabel>
            </IonItem>
          )}
        </IonList>
        <IonButton expand="full" routerLink="/AddEditBook">
          Add Book
        </IonButton>
      </IonContent>
      <IonFooter>
        <IonTabBar slot="bottom">
          <IonTabButton tab="BookList" href="/BookList">
            <IonIcon icon={book} />
            <IonLabel>Books</IonLabel>
          </IonTabButton>
          <IonTabButton tab="about" href="/about">
            <IonIcon icon={informationCircle} />
            <IonLabel>About</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Home" href="/Home">
            <IonIcon icon={logOut} />
            <IonLabel>Log Out</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonFooter>
    </IonPage>
  );
};

export default BookList;
