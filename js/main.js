$(document).ready(function () {

    var employeesData = [];

    function displaySalary() {
        var storage = localStorage.getItem("salary_2022" || null);
        employeesData = JSON.parse(storage) || [];

        if(employeesData.length !== 0) {
            //tạo sẵn khung heading cho table
            const tableHeading = [
                `<tr>
                    <th>Name</th>
                    <th>Basic salary</th>
                    <th>Reward</th>
                    <th>Fine</th>
                    <th>Salary</th>
                </tr>
                `
            ];
    
            //tạo khung dữ liệu cho table
            var htmls = employeesData.reduce((preValue, employee) => {
                return preValue.concat(`
                    <tr>
                        <td>${employee.name}</td>
                        <td>${employee.basicSalary}</td>
                        <td>${employee.reward}</td>
                        <td>${employee.fine}</td>
                        <td>${employee.salary}</td>
                    </tr>
                `)
            },tableHeading);
    
            $('#result_table').html(htmls.join(''));
            
            //lọc ra nhân viên có lương trên 1k$
            var thousandSalaryEmployees = employeesData.filter((value) => {
                return value.salary > 1000;
            });
            
            if(thousandSalaryEmployees.length !== 0) {
                $('.anounce').css("display", "block");
                
                var thousandSalaryName = thousandSalaryEmployees.map((value) => {
                    return `${value.name}`
                }).join(', ');
                
                $('.anouce_content').html(thousandSalaryName);
            };
        } else {
            $('#result_table').html('');
            $('.anounce').css("display", "none");           
            $('.anouce_content').html('');
        }
    };

    $('#add').click(function () {
        var isValid = true;

        //kiểm tra tính hợp lệ của dữ liệu
        var name = $('#name').val().trim();
        if (name === '') {
            $('.name-message').text('Required');
            isValid = false;
        } else {
            $('.name-message').text('');
        };

        var numberRegex = /^[0-9]+$/;
        var basicSalary = $('#basic-salary').val().trim();
        if (basicSalary === '' || !numberRegex.test(basicSalary) || basicSalary < 0) {
            $('.basic-message').text('Required & must be a number larger than 0');
            isValid = false;
        } else {
            $('.basic-message').text('');
        };

        var reward = $('#reward').val().trim();
        if (reward === '' || !numberRegex.test(reward) || reward < 0) {
            $('.reward-message').text('Required & must be a number larger or equal 0');
            isValid = false;
        } else {
            $('.reward-message').text('');
        }

        var fine = $('#fine').val().trim();
        if (fine === '' || !numberRegex.test(fine) || fine < 0) {
            $('.fine-message').text('Required & must be a number larger or equal 0');
            isValid = false;
        } else {
            $('.fine-message').text('');
        };

        //dữ liệu hợp lệ thì tính lương và hiện thị ra bảng
        if (isValid) {
            var salary = parseInt(basicSalary) + parseInt(reward) - parseInt(fine)

            employeesData.push({
                name: name,
                basicSalary: basicSalary,
                reward: reward,
                fine: fine,
                salary: salary
            });
            localStorage.setItem("salary_2022", JSON.stringify(employeesData));

            displaySalary();

            $('#name').focus();
            $('#name').val('');
            $('#basic-salary').val('');
            $('#reward').val('');
            $('#fine').val('');
            salary = null;
        };
    });

    $('#clear').click(function() {
        $('#name').val('');
        $('#basic-salary').val('');
        $('#reward').val('');
        $('#fine').val('');
        $('.name-message').text('');
        $('.basic-message').text('');
        $('.reward-message').text('');
        $('.fine-message').text('');

        employeesData.length = 0;
        localStorage.setItem("salary_2022", JSON.stringify(employeesData));
        displaySalary();
    });

    displaySalary();
});