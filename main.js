window.onload = function(){

    class todoItemModel{
        constructor(caption, isCompleted){
            this.caption = caption;
            this.isCompleted = isCompleted;
        }

        toggle(){
            this.isCompleted = !this.isCompleted;
            console.log("toggled");
        }
    }

    class TodoViewModel{
        constructor(filterType){
            this.todoCollection = [];
            this.filterType = "all";
        }

        addTodoItem(todoItem){
            this.todoCollection.push(todoItem);
        }

        render(){
            var self = this;
            var filteredList;
            if(this.filterType === "all"){
                filteredList = this.todoCollection;
            }
            else if(this.filterType === "active"){
                filteredList = this.todoCollection.filter(element => {
                    return !element.isCompleted;
                });
            }
            else if(this.filterType === "completed"){
                filteredList = this.todoCollection.filter(element => {
                    return element.isCompleted;
                });
            }
            document.getElementById("list").innerHTML = '';
            for(var i in filteredList){
                var task = document.createElement("li");

                var taskCheckbox = document.createElement("input");
                taskCheckbox.type = "checkbox";
                taskCheckbox.checked = filteredList[i].isCompleted;

                taskCheckbox.onclick = function(i){
                    filteredList[i].toggle();
                    this.render();
                }.bind(self,i);

                var taskCaption = document.createElement("span");
                taskCaption.innerHTML = filteredList[i].caption;

                if (taskCheckbox.checked === true) {
                    taskCaption.style.textDecoration = "line-through";
                    taskCaption.style.color = "#24a49c";
                }

                var taskDeleteBtn = document.createElement("button");
                taskDeleteBtn.innerHTML = "x";
                
                taskDeleteBtn.onclick = function(i){
                    console.log(i);
                    this.todoCollection = this.todoCollection.filter(element => {
                        return element !== filteredList[i]
                    });
                    // filteredList.splice(i,1);
                    this.render();
                }.bind(self,i);

                task.appendChild(taskCheckbox);
                task.appendChild(taskCaption);
                task.appendChild(taskDeleteBtn);

                document.getElementById("list").appendChild(task);
            }
        }   
    }

    document.getElementById("all").onclick = function(){
        document.getElementById(app.filterType).classList.remove("active");
        app.filterType = "all"
        document.getElementById(app.filterType).classList.add("active");
        app.render();
    }
    document.getElementById("active").onclick = function () {
        document.getElementById(app.filterType).classList.remove("active");
        app.filterType = "active"
        document.getElementById(app.filterType).classList.add("active");
        app.render();
    }
    document.getElementById("completed").onclick = function () {
        document.getElementById(app.filterType).classList.remove("active");
        app.filterType = "completed"
        document.getElementById(app.filterType).classList.add("active");
        app.render();
    }


    document.getElementById("taskInput").onsubmit = function(e){
        e.preventDefault();
        var caption = document.getElementById("new-task").value;
        document.getElementById("new-task").value = "";
        if (caption !== "") {
            var todoItem = new todoItemModel(caption, false);
            app.addTodoItem(todoItem);
            app.render();
        }
    }
    var app = new TodoViewModel();
    app.filterType = "all";
    document.getElementById(app.filterType).classList.add("active");
}