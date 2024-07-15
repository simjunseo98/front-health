// import React, { useState } from 'react';
// import { Card as BootstrapCard } from 'react-bootstrap';
// import PostModal from './PostModal';
// import styles from '../../assets/styles/card.module.scss';

//  export const Card = ({ post }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   return (
//     <div>
//     <div className={styles.cardWrapper} onClick={openModal}>
//       <BootstrapCard style={{ width: '18rem' , height: '18rem',margin: '35px',borderRadius: '10px'}}>
//         <BootstrapCard.Img variant="top" src={post.img_url} alt={post.title} />
//         <BootstrapCard.Body>
//           <BootstrapCard.Title>{post.title}</BootstrapCard.Title>
//           <BootstrapCard.Text>
//             {post.content}
//           </BootstrapCard.Text>
//           <div className={styles.cardFooter}>
//             <div className={styles.username}>{post.username}</div>
//             <div className={styles.date}>{post.date}</div>
//           </div>
//         </BootstrapCard.Body>
//       </BootstrapCard>
//     </div>
//     <PostModal isOpen={isModalOpen} isClose={closeModal} post={post} />
//   </div>
//   );
// };
