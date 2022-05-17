// const program = require('commander');

const create = (project) => {
  console.log('action-create-project', project);
}

const remove = (project, params) => {
  console.log('action-remove-project', project);
  console.log('action-remove-params', params);
}

module.exports = {
  create,
  remove
};
