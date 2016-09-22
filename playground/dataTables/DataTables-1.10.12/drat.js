$(document).ready(function() {
    var data = [{
        "name": "Tiger Nixon",
        "position": "System Architect",
        "salary": "$3,120",
        "start_date": {
            'display': "$600",
            'real': 5
        },
        "office": "Edinburgh",
        "extn": "5421"
    }, {
        "name": "Garrett Winters",
        "position": "Director",
        "salary": "$5,300",
        "start_date": {
            'display': '$500',
            'real': 7
        },
        "office": "Edinburgh",
        "extn": "8422"
    }]
    var t = $('#table_id_example').DataTable({
        paging:false,
        data: data,
        columns: [{
            data: 'name'
        }, {
            data: 'position'
        }, {
            data: 'salary',
            render: function(data){
                return data+'hh';
            }
        }, {
            data: 'start_date',
            render: {
                _: '.display',
                sort: 'real'
            }
        }, {
            data: 'office'
        }]
    });
    $('button').click(function() {
        $('#table_id_example').dataTable({
            'ajax': {
                'url': '127.0.0.1:80',
                'dataSrc': 'tableData'
            }
        })
    })
    t.order.fixed( {
        pre: [ 4, 'asc' ]
    } );
    $('#table_id_example').on( 'click', 'tbody td', function () {
        console.log(t.cell(this));
        t.cell( this ).edit();
    } );
});