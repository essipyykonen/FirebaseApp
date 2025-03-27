import { useState } from "react";
import { IonButton, IonInput, IonLabel, IonContent, IonPage, IonToolbar, IonHeader, IonTitle, IonFooter, IonTabBar, IonTabButton, IonIcon } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { book, informationCircle, logOut } from 'ionicons/icons';
import './Home.css';

const AddEditBook: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();

  const handleSaveBook = async () => {
    try {
      if (!title.trim() || !author.trim()) {
        setError("Title and Author are required!");
        return;
      }
      setError(null);

      await addDoc(collection(db, "books"), {
        Title: title.trim(),
        Author: author.trim(),
        Description: description.trim(),
      });

      history.push("/BookList");
    } catch (err) {
      console.error("Error adding book:", err);
      setError("Failed to save book. Please try again.");
    }
  };

  return (
    <IonPage>
  <IonHeader>
    <IonToolbar>
      <IonTitle>Book List</IonTitle>
    </IonToolbar>
  </IonHeader>

  <IonContent>
    <div className="add-edit-book-container">
      <IonLabel>Title</IonLabel>
        <IonInput value={title} onIonChange={(e) => setTitle(e.detail.value!)} />
      <IonLabel>Author</IonLabel>
        <IonInput value={author} onIonChange={(e) => setAuthor(e.detail.value!)} />
      <IonLabel>Description</IonLabel>
        <IonInput value={description} onIonChange={(e) => setDescription(e.detail.value!)} />
    {error && <div>{error}</div>}
        <IonButton onClick={handleSaveBook}>Save Book</IonButton>
    </div>
  </IonContent>
  <IonFooter>
    <IonTabBar slot="bottom">
      <IonTabButton tab="books" href="/BookList">
        <IonIcon icon={book} />
        <IonLabel>Books</IonLabel>
      </IonTabButton>
      <IonTabButton tab="about" href="/about">
        <IonIcon icon={informationCircle} />
        <IonLabel>About</IonLabel>
      </IonTabButton>
      <IonTabButton tab="logout" href="/Home">
        <IonIcon icon={logOut} />
        <IonLabel>Log Out</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonFooter>
</IonPage>
  );
};

export default AddEditBook;
