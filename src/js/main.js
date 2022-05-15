$(document).ready(function() {
  $('.custom-control-input').on('click', function() {
    if (typeof Storage !== 'undefined') {
      if ($('.custom-control-input')[0].checked == true) {
        localStorage.setItem('dm', 'dark-mode');
        localStorage.removeItem('lm');
      } else {
        localStorage.setItem('lm', 'light-mode');
        localStorage.removeItem('dm');
      }
    } else {
      alert('Sorry, your browser does not support Web Storage...');
    }
  });

  $('#exampleModal #sender-email').focusout(function() {
    var emailEntered = $('#exampleModal #sender-email').val();
    var textEntered = $('#exampleModal #message-text').val();
    if (!emailEntered.includes('@') && $('#exampleModal p.email-warning').length == 0) {
      $('#form-email').append(
        '<p class="email-warning text-warning pl-1 text-capitalize font-italic font-weight-bold">please enter a valid email !</p>'
      );
    } else if (emailEntered.includes('@') && $('#exampleModal p.email-warning').length != 0) {
      $('.email-warning').remove();
    }
  });

  $('#exampleModal #message-text').focusout(function() {
    var textEntered = $('#exampleModal #message-text').val();
    if (textEntered == '' && $('#exampleModal p.message-warning').length == 0) {
      $('#exampleModal #form-message').append(
        '<p class="message-warning text-warning pl-1 text-capitalize font-italic font-weight-bold">your message is empty !</p>'
      );
    } else if (textEntered != '' && $('#exampleModal p.message-warning').length != 0) {
      $('.message-warning').remove();
    }
  });

  $('#exampleModal #message-text').click(function() {
    $('.message-warning').remove();
  });

  $('.fp').on('click', function() {
    if (
      !$(this)
        .attr('class')
        .includes('link-active')
    ) {
      $('.link-active')
        .removeAttr('class')
        .attr('class', 'fp');
      $(this).attr('class', 'fp link-active');
    }
  });
});

function uploadImage() {
  var fileAdded = $('#profile-image');
  var imageAdded = window.URL.createObjectURL(fileAdded[0].files[0]);
  $('.profile-image').attr('src', imageAdded);
  window.URL.revokeObjectURL(fileAdded[0].files[0]);
  $('.profile-section')
    .$('label')
    .attr('for', '');
}

function uploadResumeImage() {
  var fileAdded = $('#resume-image');
  var imageAdded = window.URL.createObjectURL(fileAdded[0].files[0]);
  $('.resume-image').attr('src', imageAdded);
  window.URL.revokeObjectURL(fileAdded[0].files[0]);
}

function setTitleText(title) {
  $('.main-title').text(title.text());
}

function sendMessage() {
  var emailEntered = $('#exampleModal #sender-email').val();
  var textEntered = $('#exampleModal #message-text').val();
  if (emailEntered.includes('@') && textEntered != '') {
    $('#exampleModal').modal('hide');
    setTimeout(function() {
      alert('Email successfully sent, thank you.');
    }, 100);
  }
}

function getResume() {
  var resume = document.getElementById('myresume');
  resume.style.padding = '0px 15px';
  html2canvas(document.getElementById('myresume'), {
    onrendered: function(canvas) {
      var img = canvas.toDataURL('image/png');
      var doc = new jsPDF('p', 'mm', [275.960416667, 242.09375]);
      var width = doc.internal.pageSize.width;
      var height = doc.internal.pageSize.height;
      doc.addImage(img, 'PNG', 0, 0, width, height);
      doc.save('resume.pdf');
    }
  });
}

function checkLocalStorage() {
  var setMode;
  if (localStorage.getItem('dm')) {
    setMode = localStorage.getItem('dm');
    $('.custom-control-input')[0].checked = true;
  } else {
    setMode = localStorage.getItem('lm');
    $('.custom-control-input')[0].checked = false;
  }
  $('body').attr('class', setMode);
}

$('#exampleModal').on('show.bs.modal', function(event) {
  var button = $(event.relatedTarget);
  var modal = $(this);
  modal.find('.modal-title').text('Contact me ');
});

var horizontalScroller = document.querySelector('.horizantal-scroll-wrapper');

document.querySelector('#projects').addEventListener('wheel', function(e) {
  var findElement = document.querySelector('.link-active');
  var goElement = document.getElementById(findElement.getAttribute('href').slice(1));
  if (e.deltaY > 0) {
    goElement.nextElementSibling.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'center' });
  } else {
    goElement.previousElementSibling.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'center' });
  }
});

var animateImages = document.querySelectorAll('.animated-image-visible');
var animateTitles = document.querySelectorAll('.animated-title-visible');
var animateParagraphs = document.querySelectorAll('.animated-paragraph-visible');
var animateWrapperImage = document.querySelectorAll('.wrapper-img');
var scrollProjects = document.querySelectorAll('.projects');

observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0) {
      entry.target.style.animation = `animTest 1.5s 0.25s forwards ease-in`;
    } else {
      entry.target.style.animation = `none`;
    }
  });
});

observer2 = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0) {
      entry.target.style.animation = `animRhr 2s 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both`;
    } else {
      entry.target.style.animation = `none`;
    }
  });
});

observer3 = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0) {
      entry.target.style.animation = `animRdr 1s 1s forwards ease-in`;
    } else {
      entry.target.style.animation = `none`;
    }
  });
});

observer4 = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0) {
      entry.target.style.animation = `animRhl 1.1s 1s both`;
    } else {
      entry.target.style.animation = `none`;
    }
  });
});

observerProject = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    var title = entry.target.getAttribute('id');
    var href = 'href="#' + title + '"';
    if (entry.intersectionRatio > 0) {
      $('[' + href + ']').attr('class', 'fp link-active');
    } else {
      $('[' + href + ']').removeAttr('class');
      $('[' + href + ']').attr('class', 'fp');
    }
  });
});

scrollProjects.forEach(project => {
  observerProject.observe(project);
});

animateImages.forEach(image => {
  observer.observe(image);
});

animateTitles.forEach(title => {
  observer2.observe(title);
});

animateParagraphs.forEach(paragraph => {
  observer3.observe(paragraph);
});

animateWrapperImage.forEach(wp => {
  observer4.observe(wp);
});
