import { IonCard, IonCardContent, IonCardSubtitle, IonChip, IonHeader, IonTitle } from '@ionic/react'
import React from 'react'

export const Dev = () => {
    return (
        <IonCard>
            <IonHeader>Brayan Cadavid Carrillo</IonHeader>
            <IonCardContent>
               <IonTitle>Nice to see you !</IonTitle>
               <IonChip onClick={()=>{
                   window.location.assign('https://cadavidb.github.io/portafolioFrontend')
               }}    color="success">Mas acerca de mi :)</IonChip>
            </IonCardContent>
        </IonCard>
    )
}
