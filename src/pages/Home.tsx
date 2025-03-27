import { 
  IonButton,
  IonContent,  
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar 
} from '@ionic/react';
import './Home.css';
import { useHistory } from 'react-router-dom';

const Home: React.FC = () => {
  const history = useHistory();

  const navigateToLogin = () => {
    history.push('/login');
  };

  const navigateToRegister = () => {
    history.push('/register');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Welcome!</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>Welcome to your personal Reading Tracker!</h2>
        <p>Ready to track your books?</p>
        <IonButton expand="full" onClick={navigateToLogin}>Login</IonButton>
        <IonButton expand="full" color="secondary" onClick={navigateToRegister}>Register</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
