import { Component, OnInit ,Renderer2,HostListener} from '@angular/core';
import { FormControl,ReactiveFormsModule,NgForm, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {


  messageControl= new FormControl('')
  myform = new FormGroup({
    messageControl :this.messageControl
  }
  )
 
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
    if(text.toLowerCase()=='registrar'){
      response='teste'
    }else if(text.toLowerCase()=='logar'){
      response='primeiramente digite seu usuario'
    }else{
      response='Perdao , nao consegui identificar a acao'
    }
    let newMessage = document.createElement('div')
    let message = document.createElement('p')
    message.innerHTML=response
    let history=  document.querySelector('div.chat-history-log')
    newMessage.setAttribute('class','chat-left-message')
    newMessage.toggleAttribute(history.getAttributeNames()[0])
    newMessage.appendChild(message)
    history.appendChild(newMessage)
    document.getElementById('message')
   
  
  }
  onSubmit(f:NgForm,$event){ 
    let msg=f.form.value.messageControl
    this.appendSelfMessage(msg)
    this.BotResponse(msg)
  }
 
  constructor(private renderer: Renderer2) { }
  
  ngOnInit(): void {


    
  }
  teste(){
    console.log(this.messageControl)
  }

}
