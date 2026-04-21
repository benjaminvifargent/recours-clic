"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { downloadLetterPDF } from "@/lib/pdf";
import styles from "./dashboard.module.css";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [claims, setClaims] = useState<any[]>([]);

  useEffect(() => {
    // If not logged in, redirect to login (basic protection)
    // Commented for demo if you want to see the page even without login
    // if (!user) router.push("/login");

    const savedClaims = JSON.parse(localStorage.getItem("recours_clic_claims") || "[]");
    setClaims(savedClaims);
  }, [user, router]);

  const stats = [
    { label: "Réclamations actives", value: claims.length, color: "#BC0000" },
    { label: "En attente", value: claims.filter(c => c.status === "Envoyé").length, color: "#64748b" },
    { label: "Résolues", value: "0", color: "#22c55e" },
  ];

  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar navigation */}
      <aside className={styles.dashboardSidebar}>
        <div className={styles.sidebarLogo}>
           <span className={styles.logoIcon}>✓</span>
           <strong>RECOURS-CLIC</strong>
        </div>
        <nav className={styles.sidebarNav}>
           <Link href="/dashboard" className={styles.navItem + " " + styles.active}>Tableau de bord</Link>
           <Link href="#" className={styles.navItem}>Mes démarches</Link>
           <Link href="#" className={styles.navItem}>Mes documents</Link>
           <Link href="#" className={styles.navItem}>Mon profil</Link>
        </nav>
        <button onClick={logout} className={styles.logoutBtn}>Déconnexion</button>
      </aside>

      {/* Main Content */}
      <main className={styles.dashboardMain}>
        <div className={styles.dashboardContent}>
          <header className={styles.dashboardHeader}>
             <div>
                <h1>Bonjour, {user?.firstName || "Utilisateur"}</h1>
                <p>Voici l'état de vos dossiers en cours.</p>
             </div>
             <Link href="/tunnel?case=colis" className="btn btn-primary">+ Nouvelle réclamation</Link>
          </header>

          {/* Stats Grid */}
          <section className={styles.statsGrid}>
             {stats.map(stat => (
               <div key={stat.label} className={styles.statCard}>
                  <span className={styles.statLabel}>{stat.label}</span>
                  <span className={styles.statValue} style={{ color: stat.color }}>{stat.value}</span>
               </div>
             ))}
          </section>

          {/* Recent Claims Table */}
          <section className={styles.tableSection}>
             <div className={styles.tableHeader}>
                <h2>Mes dernières démarches</h2>
                <Link href="#" className={styles.viewAll}>Voir tout</Link>
             </div>
             
             {claims.length > 0 ? (
               <div className={styles.tableWrapper}>
                  <table className={styles.dashboardTable}>
                     <thead>
                        <tr>
                           <th>ID Dossier</th>
                           <th>Objet</th>
                           <th>Date d'envoi</th>
                           <th>Statut</th>
                           <th>Actions</th>
                        </tr>
                     </thead>
                     <tbody>
                        {claims.map(claim => (
                          <tr key={claim.id}>
                             <td><strong>{claim.id}</strong></td>
                             <td>{claim.subject}</td>
                             <td>{claim.date}</td>
                             <td>
                                <span className={styles.statusBadge} style={{ backgroundColor: claim.statusColor + '20', color: claim.statusColor }}>
                                  {claim.status}
                                </span>
                             </td>
                             <td>
                                <div className={styles.tableActions}>
                                   <button className={styles.actionBtn} title="Voir le courrier">👁️</button>
                                   <button 
                                     className={styles.actionBtn} 
                                     title="Télécharger PDF"
                                     onClick={() => downloadLetterPDF(claim.letter, `reclamation_${claim.id}.pdf`)}
                                   >
                                     📥
                                   </button>
                                </div>
                             </td>
                          </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
             ) : (
               <div style={{ padding: '60px', textAlign: 'center', background: '#f8fafc', borderRadius: '20px' }}>
                  <p style={{ fontSize: '1.1rem', color: '#64748b', marginBottom: '24px' }}>Vous n'avez pas encore de réclamation en cours.</p>
                  <Link href="/" className="btn btn-primary btn-large">Commencer ma première démarche</Link>
               </div>
             )}
          </section>
        </div>
      </main>
    </div>
  );
}
