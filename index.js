var RUNNING = 'running'

module.exports = function (Impromptu, register, dockerMachine) {
  register('isRunning', {
    cache: 'global',
    update: function (done) {
      var name = process.env.DEFAULT_DOCKER_MACHINE_NAME
      if (! name) {
        return done(null, false)
      }

      var command = 'docker-machine status ' + name
      Impromptu.exec(command, function (err, result) {
        // Errors pretty much mean no in this case
        if (err) return done(null, false)

        done(null, (result || '').trim() === RUNNING )
      })
    }
  })

  register('isNotRunning', {
    cache: 'global',
    update: function (done) {
      dockerMachine.isRunning(function (err, isRunning) {
        done(null, ! isRunning)
      })
    }
  })

  register('whale', {
    update: function () {
      return '🐳'
    }
  })
}
