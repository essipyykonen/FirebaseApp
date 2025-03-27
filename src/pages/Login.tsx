import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, useIonToast } from '@ionic/react';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { loginUser } from '../firebaseConfig';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [present] = useIonToast();
    const history = useHistory();

    async function login() {
        const user = await loginUser(email, password);
        if (!user) {
            present("Error logging in. Check your credentials.", 2000);
        } else {
            present("Login successful!", 2000);
            history.push("/BookList");  // Redirect to book list
        }
    }
    
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonInput type="email" placeholder="Email" onIonChange={(e) => setEmail(e.detail.value!)} />
                <IonInput type="password" placeholder="Password" onIonChange={(e) => setPassword(e.detail.value!)} />
                <IonButton expand="full" onClick={login}>Login</IonButton>
                <p>Don't have an account? <Link to="/register">Register</Link></p>
            </IonContent>
        </IonPage>
    );
};

export default Login;
