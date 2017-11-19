$(document).ready(() => {
  getTasks();
  getCategories();
  getCategoryOptions();

  $('#add_task').on('submit', addTask);
  $('#edit_task').on('submit', editTask);

  $('body').on('click', '.btn-edit-task', setTask);
  $('body').on('click', '.btn-delete-task', deleteTask);

  $('#add_category').on('submit', addCategory);
  $('#edit_category').on('submit', editCategory);

  $('body').on('click', '.btn-edit-category', setCategory);
  $('body').on('click', '.btn-delete-category', deleteCategory);
});

const apiKey = 'ZVKPCIukEtITp2pY8KWbJYkDlns8l-JE';

function getTasks() {
  $.get(`https://api.mlab.com/api/1/databases/taskmanager/collections/tasks?apiKey=${apiKey}`, data => {
    let output = '<ul class="list-group">';
    $.each(data, (key, task) => {
      output += '<li class="list-group-item">';
      output += `${task.task_name}<span class="due_on">[Due on ${task.due_date}]</span>`;
      if (task.is_urget == "true") {
        output += '<span class="label label-danger">Urgent</span>'
      }
      output += `<div class="pull-right"><a class="btn btn-primary btn-edit-task" data-task-name="${task.task_name}" data-task-id="${task._id.$oid}">Edit</a> <a class="btn btn-danger btn-delete-task" data-task-id="${task._id.$oid}">Delete</a></div>`;
    });
    output += '</ul>';
    $('#tasks').html(output);
  });
}

function addTask(e) {
  e.preventDefault();
  const task_name = $('#task_name').val();
  const category = $('#category').val();
  const due_date = $('#due_date').val();
  const is_urgent = $('#is_urgent').val();

  $.ajax({
    type: 'POST',
    contentType: 'application/json',
    url: `https://api.mlab.com/api/1/databases/taskmanager/collections/tasks?apiKey=${apiKey}`,
    data: JSON.stringify({ task_name, category, due_date, is_urgent }),
    success: data => window.location.href = 'index.html',
    error: (xhr, status, err) => console.error(err)
  });
}

function setTask() {
  const task_id = $(this).data('task-id');
  sessionStorage.setItem('current_id', task_id);
  window.location.href = 'edittask.html';
  return false;
}

function getTask(id) {
  $.get(`https://api.mlab.com/api/1/databases/taskmanager/collections/tasks/${id}?apiKey=${apiKey}`, task => {
    $('#task_name').val(task.task_name);
    $('#category').find(task.category).attr("selected", true)
    $('#due_date').val(task.due_date);
    $('#is_urgent').val(task.is_urgent);
  });
}

function editTask(e) {
  e.preventDefault();
  const task_id = sessionStorage.getItem('current_id');
  const task_name = $('#task_name').val();
  const category = $('#category').val();
  const due_date = $('#due_date').val();
  const is_urgent = $('#is_urgent').val();

  $.ajax({
    type: 'PUT',
    contentType: 'application/json',
    url: `https://api.mlab.com/api/1/databases/taskmanager/collections/tasks/${task_id}?apiKey=${apiKey}`,
    data: JSON.stringify({ task_name, category, due_date, is_urgent }),
    success: data => window.location.href = 'index.html',
    error: (xhr, status, err) => console.error(err)
  });
}

function deleteTask() {
  const task_id = $(this).data('task-id');
  $.ajax({
    async: true,
    type: 'DELETE',
    contentType: 'application/json',
    url: `https://api.mlab.com/api/1/databases/taskmanager/collections/tasks/${task_id}?apiKey=${apiKey}`,
    success: data => window.location.href = 'index.html',
    error: (xhr, status, err) => console.error(err)
  });
}

function getCategoryOptions() {
  $.get(`https://api.mlab.com/api/1/databases/taskmanager/collections/categories?apiKey=${apiKey}`, data => {
    let output;
    $.each(data, (key, category) => output += `<option value="${category.category_name}">${category.category_name}</option>`);
    output += '</ul>';
    $('#category').append(output);
  });
}

function getCategories() {
  $.get(`https://api.mlab.com/api/1/databases/taskmanager/collections/categories?apiKey=${apiKey}`, data => {
    let output = '<ul class="list-group">';
    $.each(data, (key, category) => {
      output += '<li class="list-group-item">';
      output += category.category_name;
      output += `<div class="pull-right"><a class="btn btn-primary btn-edit-category" data-category-name="${category.category_name}" data-category-id="${category._id.$oid}">Edit</a> <a class="btn btn-danger btn-delete-category" data-category-id="${category._id.$oid}">Delete</a></div>`;
    });
    output += '</ul>';
    $('#categories').html(output);
  });
}

function addCategory(e) {
  e.preventDefault();
  const category_name = $('#category_name').val();

  $.ajax({
    type: 'POST',
    contentType: 'application/json',
    url: `https://api.mlab.com/api/1/databases/taskmanager/collections/categories?apiKey=${apiKey}`,
    data: JSON.stringify({ category_name }),
    success: data => window.location.href = 'categories.html',
    error: (xhr, status, err) => console.log(err)
  });
}

function setCategory() {
  const category_id = $(this).data('category-id');
  sessionStorage.setItem('current_id', category_id);
  window.location.href = 'editcategory.html';
  return false;
}

function getCategory(id) {
  $.get(`https://api.mlab.com/api/1/databases/taskmanager/collections/categories/${id}?apiKey=${apiKey}`, category => $('#category_name').val(category.category_name);
}

function editCategory(e) {
  e.preventDefault();
  const category_name = $('#category_name').val();
  const category_id = sessionStorage.getItem('current_id');

  $.ajax({
    type: 'PUT',
    contentType: 'application/json',
    url: `https://api.mlab.com/api/1/databases/taskmanager/collections/categories/${category_id}?apiKey=${apiKey}`,
    data: JSON.stringify({ category_name }),
    success: data => window.location.href = 'categories.html',
    error: (xhr, status, err) => console.log(err)
  });
}

function deleteCategory() {
  const category_id = $(this).data('category-id');

  $.ajax({
    async: true,
    type: 'DELETE',
    contentType: 'application/json',
    url: `https://api.mlab.com/api/1/databases/taskmanager/collections/categories/${category_id}?apiKey=${apiKey}`,
    success: data => window.location.href = 'categories.html',
    error: (xhr, status, err) => console.log(err)
  });
}
