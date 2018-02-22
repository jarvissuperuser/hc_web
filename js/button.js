var btn = {
    pointer: 0,
    next: function() {
        var cfg = btn.config();
        var cnt = cfg.end !== "" ? cfg.end : 10;
        console.log(btn.pointer, ">", cnt);
        btn.pointer = ((btn.pointer + parseInt(cnt)) < data.d.issues.length) ? btn.pointer + parseInt(cnt) : 0;
        data.do_(parseInt(btn.pointer), cfg.issueType, cfg.status, parseInt(cnt));
    },
    previous: function() {
        var cfg = btn.config();
        var cnt = cfg.end !== "" ? cfg.end : 10
        btn.pointer = (btn.pointer - parseInt(cnt)) > 0 ? btn.pointer - parseInt(cnt) : 0;
        data.do_(parseInt(btn.pointer), cfg.issueType, cfg.status, parseInt(cnt));
    },
    config: function() {
        var inputs = $("input").serializeArray();
        var options = $("select").serializeArray();
        var args = {};
        inputs.forEach(i => {
            args[i.name] = i.value;
        });
        options.forEach(o => {
            args[o.name] = o.value
        });
        console.log(args);
        return args;
    },
    do_: function() {
        var cfg = btn.config();
        var cnt = cfg.end !== "" ? cfg.end : 10;
        var start = cfg.start !== "" ? cfg.start : 0;
        data.do_(parseInt(start), cfg.issueType, cfg.status, parseInt(cnt));
    },
    create_cherries: function() {
        if (data.d.issues !== undefined) {
            var i = data.d.issues;
            var cnt = 0;
            i.forEach(task => {
                if (task.fields.subtasks.length > 0) {
                    var b = "<button class='w3-btn' onclick='data.do_(" +
                        cnt + ",\"subtasks\",\"-\",1)'><p>" + task.fields.summary + "</p></button>";
                    $(".cntrl .w3-card-4 .w3-content").append(b);
                }
                cnt = cnt + 1;
            });
        }
    }
};