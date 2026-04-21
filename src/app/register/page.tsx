"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import styles from "../login/login.module.css";

export default function Register() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");

  const handleRegister = (e: React.FormEvent) => {
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
        <h1>Créer un compte</h1>
        <p>Rejoignez-nous pour simplifier vos réclamations.</p>
        
        <form className={styles.loginForm} onSubmit={handleRegister}>
           <div className={styles.formGroup}>
              <label>Nom complet</label>
              <input type="text" placeholder="Jean Dupont" required />
           </div>
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
           <button type="submit" className="btn btn-primary btn-full">S'inscrire gratuitement</button>
        </form>

        <div className={styles.loginFooter}>
           Déjà un compte ? <Link href="/login">Se connecter</Link>
        </div>
      </div>
    </div>
  );
}
