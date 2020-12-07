import React,{useState} from 'react';
import './ManageClassificationCategory.css';
import $ from 'jquery';
import Header from './header';
import noCategory from '../../noun_Category.png';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

const useStyles = makeStyles({
    centeredDialog: {
      width:400,
      height:440,
      position: 'fixed',
      top: '50%',
      left: '50%',
      margin: '105px 490px 0 450px',
      padding: '0 0 12px',
      borderRadius:4,
      //backgroundColor : "#ffffff",
    //   boxShadow: '0 20px 80px 0 rgba(0, 0, 0, 0.3)',
    },
  });
  
  const styles = (theme) => ({
    root: {
      margin: 0,
      textAlign:'center',
      fontSize:'16px',
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    dialogTitle:{
        fontSize:'16px',
        width:'251px',
        height:'17px',
        textAlign:'center',
        color:'#32363a',
    },
  });
  
  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography className={classes.dialogTitle} variant="h6">{children}</Typography>
        
      </MuiDialogTitle>
    );
  });
  
  const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);
  
  const DialogActions = withStyles((theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);

  
function ManageCategory(){
    const [open, setOpen] = React.useState(false);
    const [catopen, setCatOpen] = React.useState(false);
    const [childcatopen, setChildCatOpen] = React.useState(false);
  const classes = useStyles();

  $(document).ready(function(){
  $('#classCategoryName').text($('#name').val());
  $('#catConfirm').prop('disabled', true);
  $('#catCheckbox').click(function(){
    if(this.checked){
    $('.catStyle').css("background-color","#ebf5fe");
  }
  else{
    $('.catStyle').css("background-color","#ffffff");
  }
 
  
   });

   $('.caretCatTree').click(function(){
    if($(".caretCatTree")[0].className.includes("fa-chevron-right")){
      $(".caretCatTree").removeClass("fas fa-chevron-right");
      $(".caretCatTree").addClass("fas fa-chevron-down");
      
    }
    else{
      $(".caretCatTree").removeClass("fas fa-chevron-down");
      $(".caretCatTree").addClass("fas fa-chevron-right");
    }
    $(".nestedChildCat").toggleClass("childActive");
   });
   $('#addChildCroma').click(function(){
    setChildCatOpen(true);
  });

  $('#addChildHitachi').click(function(){
    setChildCatOpen(true);
  });

  });
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const catDialogOpen = () => {
    setCatOpen(true);
  };
  const catDialogClose = () => {
    setCatOpen(false);
  };
  const catChildDialogClose = () => {
    setChildCatOpen(false);
  };

  const ConfirmChildCategory = () => {
    if($('#childCategoryNames').val()!=""){
      $('#childCategoryNames').removeAttr('placeholder');
      var childCatArr=$('#childCategoryNames').val().split(",");
    for(var i=0;i<childCatArr.length;i++){
      
      var node = document.createElement("UL");
    node.className="nestedChildCat";
  var linode=document.createElement("LI");
  linode.id=childCatArr[i];
  node.appendChild(linode);
  document.getElementById("catLI").appendChild(node);
  $('#'+childCatArr[i]).append("<div class='childCat'><input type='checkbox' /><i class='fas fa-chevron-right caretCatTree'></i><span>"+childCatArr[i]+"</span></div>");
    }
    setChildCatOpen(false);
    toastr.options = {
      positionClass : 'toast-top-center-full-width',
      hideDuration: 300,
      timeOut: 20000,
      closeButton: false,
    }
    toastr.clear();
    setTimeout(() => toastr.success('Added '+childCatArr.length+' Child Categories successfuly','',{"iconClass": 'customer-info'}), 300);
  }
    
  };
  
  

  $('#addCategory').click(function(){
   catDialogOpen();
  });

  const ConfirmCategory = () => {
    setCatOpen(false);
    if($('#categoryNames').val()!=""){
      $('#categoryNames').removeAttr('placeholder');
      var Catarr=$('#categoryNames').val().split(",");
    for(var i=0;i<Catarr.length;i++){
      $('.RectangleNew').after("<div class='CategoryNew'><ul class='categoryTree' id='cat"+Catarr[i]+"'><li id='catLI'><div class='catStyle'><i class='fas fa-chevron-right caretCatTree'></i><input type='checkbox' name='catCheckbox' id='catCheckbox' onclick='SelectCategoryName()'/><span class='categoryItemName'>"+Catarr[i]+"</span><div class='action-list'><button class='CatalogMapping'>Catalog Mapping</button><button class='ViewDetails'>View Details</button><button class='AttributesAddChild'>Attributes</button><button id='addChild"+Catarr[i]+"' class='AttributesAddChild'><i class='fa fa-plus'></i>Add Child</button></div></li></div></ul></div>");
    }
    toastr.options = {
      positionClass : 'toast-top-center-full-width',
      hideDuration: 300,
      timeOut: 20000,
      closeButton: false,
    }
    toastr.clear();
    setTimeout(() => toastr.success('Added '+Catarr.length+' Categories successfuly','',{"iconClass": 'customer-info'}), 300);
    }
    
  };

  const CategoryEnter = () => {
    if($('#categoryNames').val()!=''){
    $('#catConfirm').prop('disabled', false);
  }
  else{
    $('#catConfirm').prop('disabled', true);
  }
  };

  const ChildCategoryEnter = () => {
    if($('#childCategoryNames').val()!=''){
    $('#catConfirm').prop('disabled', false);
  }
  else{
    $('#catConfirm').prop('disabled', true);
  }
  };

  
  
  const FormatInputField=()=>{
    if($('#name').val()!="" || $('#type').val()!="" || $('#desc').val()!=""){
    $('#name').removeAttr('placeholder');
    $('#type').removeAttr('placeholder');
    $('#desc').removeAttr('placeholder');
    }
  };

  const ConfirmCreateClass=()=>{
      if($('#name').val()!="" && $('#type').val()!="" && $('#desc').val()!=""){
        
          $('.classificationDetails').hide();
var newClassName=$('#name').val();
        toastr.options = {
            positionClass : 'toast-top-center-full-width',
            hideDuration: 300,
            timeOut: 20000,
            closeButton: false,
          }
          toastr.clear();
          setTimeout(() => toastr.success('New Classification System defined successfuly','',{"iconClass": 'customer-info'}), 300);
          var newCat = document.getElementById("newClasscategory");
          console.log(newCat);
          if(newCat!=null){
          var option = document.createElement("option");
          option.text = newClassName;
          newCat.add(option);
        }
        else{
            $('.manageClassCategory').after("<div class='RectangleNew'><select class='newClassInputField' name='newClasscategory' id='newClasscategory'><option value='"+newClassName+"'>"+newClassName+"</option></select><button class='addCategoryBtn' id='addCategory'><i class='fa fa-plus'></i>Add Category</button></div>");
            $('#addClsCategory').addClass("addClassRight");
        }
        setOpen(false);
    }
        
  };

    return (
        <div className="manageClassCategoryBackground">
        <div className="manageClassCategory">
         <p>Manage Classification Categories</p>
         </div>
         <div className="addClassCategoryDiv"><button id="addClsCategory" className="addClassCategory"><i class="fa fa-plus" aria-hidden="true"></i></button></div>
         <div className="classificationDetails">
             <img src={noCategory}/>
             <p className="classificationStandard">No classification system is defined </p>
         <button className="btnClassCategory" onClick={handleClickOpen}>Define Classification System</button>
         <Dialog classes={{
        root: classes.centeredDialog, // class name, e.g. `root-x`
      }} onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Define New Classification System
        </DialogTitle>
        <DialogContent dividers>
            <div>
        <label htmlFor="namelbl" className="labelClass">
            Name
            </label>
            <input
              type="text"
              id="name"
              className="InputFieldClass"
              placeholder="TCP Sales Hierarchy"
              onKeyUp={FormatInputField}
            />
            <label htmlFor="type" className="labelClass">
            Type
            </label>
            <input
              type="text"
              id="type"
              className="InputFieldClass"
              placeholder="Primary"
              onKeyUp={FormatInputField}
            />
            <label htmlFor="desc" className="labelClass">
            Description
            </label>
            <input
              type="text"
              id="desc"
              className="InputFieldClass"
              placeholder="Category Structure for TCP Sales"
              onKeyUp={FormatInputField}
            />
            </div>
        </DialogContent>
        <DialogActions>
            <button id="classConfirm" className="button-10-12Confirm" onClick={ConfirmCreateClass}>Confirm</button>
            <button id="classCancel" className="button-10-12Cancel" onClick={handleClose}>Cancel</button>
        </DialogActions>
      </Dialog>
         </div>

<div>
<Dialog classes={{
        root: classes.centeredDialog, // class name, e.g. `root-x`
      }} onClose={catDialogClose} aria-labelledby="category-dialog-title" open={catopen}>
        <DialogTitle id="category-dialog-title" onClose={catDialogClose}>
          Add Categories
        </DialogTitle>
        <DialogContent dividers>
            <div>
        <label id="classCategoryName" htmlFor="namelbl" className="labelClass">
            Name
            </label>
            <textarea id="categoryNames" name="categoryNames" className="CategoryNames" rows="4" cols="50" onKeyUp={CategoryEnter} placeholder="Enter comma separated values to add multiple folders">
  
            </textarea>
            </div>
        </DialogContent>
        <DialogActions>
            <button id="catConfirm" className="button-Cat-Confirm" onClick={ConfirmCategory}>Confirm</button>
            <button id="catCancel" className="button-10-12Cancel" onClick={catDialogClose}>Cancel</button>
        </DialogActions>
      </Dialog>
      <Dialog classes={{
        root: classes.centeredDialog, // class name, e.g. `root-x`
      }} onClose={catChildDialogClose} aria-labelledby="category-dialog-title" open={childcatopen}>
        <DialogTitle id="category-dialog-title" onClose={catChildDialogClose}>
          Add Child Categories
        </DialogTitle>
        <DialogContent dividers>
            <div>
        <label id="classCategoryName" htmlFor="namelbl" className="labelClass">
            Name
            </label>
            <textarea id="childCategoryNames" name="childCategoryNames" className="CategoryNames" rows="4" cols="50" onKeyUp={ChildCategoryEnter} placeholder="Enter comma separated values to add multiple folders">
  
            </textarea>
            </div>
        </DialogContent>
        <DialogActions>
            <button id="catConfirm" className="button-Cat-Confirm" onClick={ConfirmChildCategory}>Confirm</button>
            <button id="catCancel" className="button-10-12Cancel" onClick={catChildDialogClose}>Cancel</button>
        </DialogActions>
      </Dialog>
  </div>        
        </div>
    );
}

export default ManageCategory
