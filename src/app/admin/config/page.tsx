"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { RECIPIENTS } from "@/lib/data";
import styles from "../admin.module.css";

export default function AdminConfig() {
  const [entities, setEntities] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", service: "", address: "", email: "" });

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("recours_clic_recipients");
    if (saved) {
      setEntities(JSON.parse(saved));
    } else {
      setEntities(RECIPIENTS);
    }
  }, []);

  // Save to localStorage whenever entities change
  useEffect(() => {
    if (entities.length > 0) {
      localStorage.setItem("recours_clic_recipients", JSON.stringify(entities));
    }
  }, [entities]);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({ name: "", service: "", address: "", email: "" });
    setShowModal(true);
  };

  const handleOpenEdit = (entity: any) => {
    setEditingId(entity.id);
    setFormData({ 
      name: entity.name, 
      service: entity.service, 
      address: entity.address, 
      email: entity.email 
    });
    setShowModal(true);
  };

  const handleSave = () => {
    let updated;
    if (editingId) {
       updated = entities.map(e => e.id === editingId ? { ...e, ...formData } : e);
    } else {
      const id = entities.length > 0 ? Math.max(...entities.map(e => e.id)) + 1 : 1;
      updated = [...entities, { id, ...formData }];
    }
    setEntities(updated);
    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette enseigne ?")) {
      const updated = entities.filter(e => e.id !== id);
      setEntities(updated);
    }
  };

  const handleReset = () => {
    if (confirm("Voulez-vous réinitialiser la liste aux valeurs par défaut ?")) {
      setEntities(RECIPIENTS);
      localStorage.removeItem("recours_clic_recipients");
    }
  };

  return (
    <div className={styles.adminContainer}>
      <aside className={styles.adminSidebar}>
         <div className={styles.adminLogo}>
            <span className={styles.logoIcon}>✓</span>
            <strong>RECOURS-ADMIN</strong>
         </div>
         <nav className={styles.adminNav}>
            <Link href="/admin">Tableau de bord</Link>
            <Link href="/admin/dossiers">Dossiers</Link>
            <Link href="/admin/templates">Templates</Link>
            <Link href="/admin/paiements">Paiements</Link>
            <Link href="/admin/config" className={styles.active}>Configuration</Link>
         </nav>
      </aside>

      <main className={styles.adminContent}>
         <header className={styles.adminHeader}>
            <h2>Configuration - Entités Commerciales</h2>
            <div className={styles.adminUserPills}>Admin System</div>
         </header>

         <div className={styles.adminBody}>
            <div className={styles.adminPanel}>
               <div className={styles.configActions} style={{ gap: '10px' }}>
                  <button className="btn btn-outline btn-sm" onClick={handleReset}>Réinitialiser par défaut</button>
                  <button className="btn btn-primary btn-sm" onClick={handleOpenAdd}>+ Ajouter une enseigne</button>
               </div>

               <h3>Répertoire des enseignes connues ({entities.length})</h3>
               <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '2rem' }}>
                 Gérez les coordonnées des entreprises. Ces données sont persistées localement.
               </p>

               <div className={styles.adminTableWrapper}>
                  <table className={styles.adminTable}>
                     <thead>
                        <tr>
                           <th>Enseigne</th>
                           <th>Service</th>
                           <th>Adresse Postale</th>
                           <th>Email Contact</th>
                           <th>Actions</th>
                        </tr>
                     </thead>
                     <tbody>
                        {entities.map(entity => (
                          <tr key={entity.id}>
                             <td><strong>{entity.name}</strong></td>
                             <td>{entity.service}</td>
                             <td style={{ maxWidth: '250px', fontSize: '0.85rem' }}>{entity.address}</td>
                             <td><code style={{ fontSize: '0.8rem' }}>{entity.email}</code></td>
                             <td>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                   <button className={styles.aBtn} onClick={() => handleOpenEdit(entity)}>Éditer</button>
                                   <button className={styles.aBtn} style={{ color: '#ef4444' }} onClick={() => handleDelete(entity.id)}>Suppr.</button>
                                </div>
                             </td>
                          </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </main>

      {/* Modal Unified for Add/Edit */}
      {showModal && (
        <div className={styles.modalOverlay}>
           <div className={styles.modalContent}>
              <h3>{editingId ? "Modifier l'entité" : "Nouvelle entité"}</h3>
              <div className={styles.configForm}>
                 <div className={styles.formGroup}>
                    <label>Nom de l'enseigne</label>
                    <input 
                      type="text" 
                      placeholder="Ex: Amazon" 
                      value={formData.name} 
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                 </div>
                 <div className={styles.formGroup}>
                    <label>Service concerné</label>
                    <input 
                      type="text" 
                      placeholder="Ex: Service Réclamation" 
                      value={formData.service} 
                      onChange={e => setFormData({...formData, service: e.target.value})}
                    />
                 </div>
                 <div className={styles.formGroup}>
                    <label>Adresse postale complète</label>
                    <textarea 
                      placeholder="Adresse..." 
                      rows={3}
                      value={formData.address} 
                      onChange={e => setFormData({...formData, address: e.target.value})}
                    ></textarea>
                 </div>
                 <div className={styles.formGroup}>
                    <label>Email de destination</label>
                    <input 
                      type="email" 
                      placeholder="reclamation@entreprise.com" 
                      value={formData.email} 
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                 </div>
                 <div className={styles.modalBtns}>
                    <button className="btn btn-outline btn-sm" onClick={() => setShowModal(false)}>Annuler</button>
                    <button className="btn btn-primary btn-sm" onClick={handleSave}>
                       {editingId ? "Mettre à jour" : "Enregistrer"}
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
