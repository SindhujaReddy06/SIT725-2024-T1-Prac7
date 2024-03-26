const cardList = [
    {
        title: "Bird 2",
        image: "images/bird2.png",
        link: "About Bird 2",
        description: "Hey! You can call us Scarlet Macaw"
    },
    {
        title: "Bird 3",
        image: "images/bird3.png",
        link: "About Bird 3",
        description: "Hey!! I am an Eagle"
    }
]
 const clickMe = () => {
    alert("Thanks for clicking me. Hope you have a nice day!")
 }

const submitForm = () => {
    let formData = {};
    formData.first_name = $('#first_name').val();
    formData.last_name = $('#last_name').val();
    formData.password = $('#password').val();
    formData.email = $('#email').val();

    console.log("Form Data Submitted: ", formData);
}

const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = '<div class="col s4 center-align">'+
            '<div class="card medium"><div class="card-image waves-effect waves-block waves-light bird-card" data-description="'+item.description+'"><img class="activator bird-image" src="'+item.image+'">'+
            '</div><div class="card-content">'+
            '<span class="card-title activator grey-text text-darken-4">'+item.title+'<i class="material-icons right">more_vert</i></span><p><a href="#" class="bird-description-link">'+item.link+'</a></p></div>'+
            '<div class="card-reveal">'+
                '<span class="card-title grey-text text-darken-4">'+item.title+'<i class="material-icons right">close</i></span>'+
                '<p class="card-text card-desc-color">'+item.description+'</p>'+
              '</div></div></div>';
        $("#card-section").append(itemToAppend);
    });
}

$(document).ready(function () {
    $('.bird-card').click(function(event) {
        event.preventDefault();
        var $cardReveal = $(this).closest('.card').find('.card-reveal');
        $cardReveal.slideToggle();
    });
    $('.materialboxed').materialbox();
    $('#formSubmit').click((event) => {
        event.preventDefault();
        submitForm();
    })
    addCards(cardList);
    $('.modal').modal();
});
