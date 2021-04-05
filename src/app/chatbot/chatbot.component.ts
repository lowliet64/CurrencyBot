import { Component, OnInit } from '@angular/core';
import { FormControl,NgForm, FormGroup } from '@angular/forms';
import {ApiService} from '../services/api.service'
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {

 
  messageControl= new FormControl('')

  constructor(private apiService: ApiService) { }



  myform = new FormGroup({
    messageControl :this.messageControl
  }
  )


  setFieldNumber(){
    
      document.getElementById('message').setAttribute('type','number')
    
  }
  setFieldPassword(){
    document.getElementById('message').setAttribute('type','password')
  }

  setFieldText(){
    document.getElementById('message').setAttribute('type','text')
  }


  appendSelfMessage(msg){
    let newMessage = document.createElement('div')
    let message = document.createElement('p')
    message.innerHTML=msg
    let history=  document.querySelector('div.chat-history-log')
    newMessage.setAttribute('class','chat-right-message')
    newMessage.toggleAttribute(history.getAttributeNames()[0])
    newMessage.appendChild(message)
    history.appendChild(newMessage)
    document.getElementById('message')
    this.myform.reset()
  }


  BotResponse(msg){
    let response=''
    let text=msg
    let action = window.localStorage.getItem('action') 
    let step = window.localStorage.getItem('step')
    if(text.toLowerCase()=='logar' || text.toLowerCase()=='login' ){
      window.localStorage.setItem('action','login')
      window.localStorage.setItem('step','1')
      response='Otimo , Primeiramente digite seu nome de usuario'
    }else if(text.toLowerCase()=='logar'){
      response='primeiramente digite seu usuario'
    }else if(msg!==null ){
      if(action ==='login' && step=='2'){
        response='Agora digite sua senha de usuario'
      }
    }else {
      response= 'Perdao , nao consegui identificar o que solicitou'
    }
    let newMessage = document.createElement('div')
    let message = document.createElement('p')
    message.innerHTML=response
    let history=  document.querySelector('div.chat-history-log')
    newMessage.setAttribute('class','chat-left-message')
    newMessage.toggleAttribute(history.getAttributeNames()[0])
    newMessage.appendChild(message)
    history.appendChild(newMessage)
  }


  
  async onSubmit(f:NgForm,$event){ 
    let msg=f.form.value.messageControl
    let action =window.localStorage.getItem('action')
    let step= window.localStorage.getItem('step')
    let api_response
    if(action!==undefined){
        if(action==='login'){
            if(window.localStorage.getItem('step')==='1'){
              window.localStorage.setItem('username',msg)
              this.setFieldPassword()
              window.localStorage.setItem('step','2')
            }else if(window.localStorage.getItem('step')==='2'){
                let username = window.localStorage.getItem('username')
                let password = f.form.value.messageControl
            
                  this.apiService.login(username,password).subscribe(
                    res => api_response=res
                  
                    )
                this.setFieldText()
                
            }else {
              console.log('lost way')
            }
        }
    }
    if( action=='login' && step=='2'){  
      this.appendSelfMessage("*************")
      this.BotResponse(msg)
      window.localStorage.clear()
    }else{
      this.appendSelfMessage(msg)
      this.BotResponse(msg)
    }
 
   
  }
 

 
  ngOnInit(): void {


    
  }
 
  teste(){
    console.log(this.messageControl)
  }

}
