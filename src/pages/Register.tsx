import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, useIonToast } from '@ionic/react';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { registerUser } from '../firebaseConfig';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [present] = useIonToast();
    const history = useHistory();

    async function handleRegister() {
        if (password !== cpassword) {
            present("Passwords do not match", 2000);
            return;
        }

        const user = await registerUser(email, password);
        if (!user) {
            present("Error creating account", 2000);
        } else {
            present("Account created successfully!", 2000);
            history.push("/login");  // Redirect to login page after successful registration
        }
    }
    
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Register</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonInput type="email" placeholder="Email" onIonChange={(e) => setEmail(e.detail.value!)} />
                <IonInput type="password" placeholder="Password" onIonChange={(e) => setPassword(e.detail.value!)} />
                <IonInput type="password" placeholder="Confirm Password" onIonChange={(e) => setCPassword(e.detail.value!)} />
                <IonButton expand="full" onClick={handleRegister}>Register</IonButton>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </IonContent>
        </IonPage>
    );
};

export default Register;
