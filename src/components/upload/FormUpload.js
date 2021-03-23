import React , {useState,useEffect}from 'react'

import { IonLoading,IonToast, IonButton, IonIcon,IonHeader,IonToolbar,IonTitle, IonCol, IonContent, IonGrid, IonInput, IonItem, IonLabel, IonPage, IonRow, IonList, IonCardSubtitle } from '@ionic/react'


import { cloudUpload} from 'ionicons/icons';
import { heart,happyOutline } from 'ionicons/icons'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useHistory } from 'react-router'




export const FormUpload = React.memo(({}) => {

  

  const [Files, SetFiles] = useState([]);

  const [exito, setexito] = useState(false);

  const [Liststudents, setListstudents] = useState([]);

  const [Name, setName] = useState(null);

  const [pass, Setpass] = useState(true);


  const [Loading, setLoading] = useState(false);



  const GetUsers=async()=>{

   await fetch("https://fisica.loca.lt/users").then(data=>{
      return data.json(data).then(data=>{
        setListstudents(data.users);
      }
        )

    })
  }


  useEffect(() => {
    GetUsers();
  }, [])





  const Signin=async(form)=>{

    
     await axios.post("https://fisica.loca.lt/register",form).then(data=>{GetUsers()})


  }


  const Addfile=async()=>{



    if (Files.length>0) {

      let formData = new FormData();
     
     
      for (let i = 0; i < Files.length; i++) {
     
      formData.append('File',Files[i])
     
      }
     
      await   fetch("https://fisica.loca.lt/upload",
     
      { method: 'POST', body:formData }
     
     ).then((data)=>{
      setexito(true)
     
     
     }).catch({})
     
       }else{
         console.log('no hay archivos')
       }


  }
    

   


  
    const {register, errors, handleSubmit} = useForm();
    
  


  const CargarArchivos=(files)=>{
    SetFiles(files)
 }


 
  

    return (
        <IonContent>






  <IonToast color="success"
        isOpen={exito}
        onDidDismiss={() => setexito(false)}
        message="Archivo subido"
        duration={3000}
      />










    <form onSubmit={handleSubmit(Signin)}>


   
     <IonTitle >Welcome :)  
         
            

    
         <IonIcon style={{ fontSize: "30px", color: "red" }} icon={heart} />
      </IonTitle>
         
      <label>
        <input type="file" onChange={(e)=>

            { 
               CargarArchivos(e.target.files)
                setName(e.target.files[0].name)
                Setpass(false)
             }
            }
            
             ></input>
        
        <span>+</span>
        
      </label>
      

  {(Name?<h6>{Name}</h6>:null)}


      <IonRow>
  <IonCol>
      <IonItem>
            <IonLabel position="floating">Escribe tu nombre completo</IonLabel>
                <IonInput
                    type="text"
                    placeholder="escribe tu nombre"
                    name="name"
                    ref={
                      register({
                         required: {
                            value: true,
                            message: 'nombre es requerido' }
                          })}>
 </IonInput>
               
</IonItem>
</IonCol>
</IonRow> 




<IonButton type="submit" size="default" color="primary" disabled={pass}>
        <IonIcon icon={cloudUpload} style={{margin:'20px'}} ></IonIcon>
      </IonButton>

      </form>



<IonList style={{margin:'10px'}}>
  <IonCardSubtitle>Lista de Estudiantes que entregaron</IonCardSubtitle>
  

  {
    (Liststudents.length!=0?Liststudents.map(est=>{


     
       return ( <IonItem key={est._id} detailIcon={happyOutline} detail="true">{est.name} </IonItem>)

    }):


    <IonContent>
      <IonLoading
        isOpen={Loading}
        onDidDismiss={() => setLoading(false)}
        message={'Please wait...'}
        duration={5000}
      />
    </IonContent>
    )
  }
  


 
</IonList>

      </IonContent>

      
    )
    
})
