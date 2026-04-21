"use client";

import Link from "next/link";
import styles from "./admin.module.css";

export default function AdminDashboard() {
  return (
    <div className={styles.adminContainer}>
      <aside className={styles.adminSidebar}>
         <div className={styles.adminLogo}>
            <span className={styles.logoIcon}>✓</span>
            <strong>RECOURS-ADMIN</strong>
         </div>
         <nav className={styles.adminNav}>
            <Link href="/admin" className={styles.active}>Tableau de bord</Link>
            <Link href="/admin/dossiers">Dossiers</Link>
            <Link href="/admin/templates">Templates</Link>
            <Link href="/admin/paiements">Paiements</Link>
            <Link href="/admin/config">Configuration</Link>
         </nav>
      </aside>

      <main className={styles.adminContent}>
         <header className={styles.adminHeader}>
            <h2>Vue d'ensemble</h2>
            <div className={styles.adminUserPills}>Admin System</div>
         </header>

         <div className={styles.adminBody}>
            <div className={styles.adminStatsGrid}>
               <div className={styles.aStat}>
                  <header>Dossiers Créés</header>
                  <div className={styles.val}>1,284</div>
                  <div className={styles.trend + " " + styles.pos}>+12% ce mois</div>
               </div>
               <div className={styles.aStat}>
                  <header>Revenu (EUR)</header>
                  <div className={styles.val}>8,420 €</div>
                  <div className={styles.trend + " " + styles.pos}>+5% ce mois</div>
               </div>
               <div className={styles.aStat}>
                  <header>Taux de succès</header>
                  <div className={styles.val}>94.2%</div>
                  <div className={styles.trend}>Stable</div>
               </div>
            </div>

            <div className={styles.adminPanel}>
               <h3>Derniers dossiers reçus</h3>
               <div className={styles.adminTableWrapper}>
                  <table className={styles.adminTable}>
                     <thead>
                        <tr>
                           <th>ID</th>
                           <th>Utilisateur</th>
                           <th>Cas</th>
                           <th>Date</th>
                           <th>Actions</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr>
                           <td>#4829</td>
                           <td>j.dupont@gmail.com</td>
                           <td>Colis</td>
                           <td>Il y a 5 min</td>
                           <td><button className={styles.aBtn}>Ouvrir</button></td>
                        </tr>
                        <tr>
                           <td>#4828</td>
                           <td>m.legrand@sf.fr</td>
                           <td>Abonnement</td>
                           <td>Il y a 14 min</td>
                           <td><button className={styles.aBtn}>Ouvrir</button></td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </main>
    </div>
  );
}
