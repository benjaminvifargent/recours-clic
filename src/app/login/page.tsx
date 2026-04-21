"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import styles from "./login.module.css";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
    router.push("/dashboard");
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <Link href="/" className={styles.loginLogo}>
           <span className={styles.logoIcon}>✓</span>
           <strong>RECOURS-CLIC</strong>
        </Link>
        <h1>Connexion</h1>
        <p>Accédez à vos réclamations et documents.</p>
        
        <form className={styles.loginForm} onSubmit={handleLogin}>
           <div className={styles.formGroup}>
              <label>Email</label>
              <input 
                type="email" 
                placeholder="votre@email.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
           </div>
           <div className={styles.formGroup}>
              <label>Mot de passe</label>
              <input type="password" placeholder="••••••••" required />
           </div>
           <button type="submit" className="btn btn-primary btn-full">Se connecter</button>
        </form>

        <div className={styles.loginFooter}>
           Pas encore de compte ? <Link href="/register">Créer un compte</Link>
        </div>
      </div>
    </div>
  );
}
