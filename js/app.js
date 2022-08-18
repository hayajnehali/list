let tasker ={
    construct:function(){
        this.selectElement();
        this.bindevents();
        this.scantasklist();
    },
    selectElement : function(){
        this.taskinput= document.getElementById("input-task");
        this.tasklist=document.getElementById("tasks");
        this.tasklistchildren = this.tasklist.children;
        this.addbutton =document.getElementById("add-task-btn");
        this.erorrmessage = document.getElementById("error");
    },

    buildtask : function(){
        
        let tasklistitem , taskcheckbox , taskvalue, taskbutton,tasktrash;
        tasklistitem = document.createElement("li");
        tasklistitem.setAttribute("class","task");

        taskcheckbox= document.createElement("input");
        taskcheckbox.setAttribute("type","checkbox");


        taskvalue= document.createTextNode(this.taskinput.value);

        taskbutton=document.createElement("button");

        tasktrash= document.createElement("i");
        tasktrash.setAttribute("class","fa fa-trash");


        taskbutton.appendChild(tasktrash);

        tasklistitem.appendChild(taskcheckbox);
        tasklistitem.appendChild(taskvalue);
        tasklistitem.appendChild(taskbutton);

        this.tasklist.appendChild(tasklistitem);
    },
    error: function(){
        this.erorrmessage.style.display="block";
    },
    addtask: function(){
        let taskvalue= this.taskinput.value;
        this.erorrmessage.style.display="none";

        if(taskvalue === ""){
            this.error();
        }else{
            this.buildtask();
            this.taskinput.value="";
            this.scantasklist();
        }
    },
    enterkey: function(event){
        if(event=== 13 || event.which ===13){
            this.addtask();
        }
    },
    bindevents : function(){
        this.addbutton.onclick =this.addtask.bind(this);

        this.taskinput.onkeypress = this.enterkey.bind(this);
    },
    scantasklist:function(){
        let tasklistitem , checkbox, deletebutton;

        for(i=0; i < this.tasklistchildren.length ; i++){
            tasklistitem= this.tasklistchildren[i];
            checkbox = tasklistitem.getElementsByTagName("input")[0];
            deletebutton = tasklistitem.getElementsByTagName("button")[0];

            checkbox.onclick = this.completetask.bind(this, tasklistitem, checkbox);
            

            deletebutton.onclick= this.deletetask.bind(this,i);
        }
    },
    deletetask: function(i){
        this.tasklistchildren[i].remove();
        this.scantasklist();
    },
    completetask:function(tasklistitem,checkbox){
        if(checkbox.checked){
            tasklistitem.className = "task completed";
        }else{
            this.incomleteTask(tasklistitem);
        }
    },
    incomleteTask: function(tasklistitem){
        tasklistitem.className="task";
    }
}