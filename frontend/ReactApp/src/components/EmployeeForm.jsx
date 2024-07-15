import SelectField from "./SelectField"

const EmployeeForm=()=>{
    return<>

        <main>
          <div class="content">
            <div class="heading">
              <h2>Create Employee</h2>
            </div>
            <div class="form-content">
              <form action="/action_page.php">
                <div class="inputs">
                  <div class="form-input">
                    <label for="fname">Employee name</label><br />
                    <input
                      type="text"
                      id="fname"
                      name="fname"
                      value="Employee name"
                    />
                  </div>
                  <div class="form-input">
                    <label for="lname">Employee ID</label><br />
                    <input
                      type="text"
                      id="lname"
                      name="lname"
                      value="Employee ID"
                    />
                  </div>
                  <div class="form-input">
                    <label for="fname">Joining Date</label><br />
                    <input
                      type="text"
                      id="fname"
                      name="fname"
                      value="Joining Date"
                    />
                  </div>
                  <div class="form-input">
                    <label for="cars">Role:</label><br />
                    <select id="cars" name="cars" value="Role" placeholder="Role">
                      <option value="" disabled selected hidden>
                        Select your Role
                      </option>
                      <option value="Dev">Developer</option>
                      <option value="QA">Tester</option>
                      <option value="HR">HR</option>
                    </select>
                  </div>
                  <div class="form-input">
                    <label for="fname">Status</label><br />
                    <SelectField></SelectField>
                  </div>
                  <div class="form-input">
                    <label for="fname">Experience</label><br />
                    <input
                      type="text"
                      id="fname"
                      name="fname"
                      value="Experience"
                    /><br />
                  </div>
                  <div class="form-input">
                    <label for="fname">Address</label><br />
                    <input
                      type="text"
                      id="fname"
                      name="fname"
                      value="Address"
                    /><br />
                  </div>
                </div>
                <br />
                <input type="submit" value="Create" id="sub" />
                <input type="button" value="Cancel" />
              </form>
            </div>
          </div>
        </main>
 
    
</>
}

export default EmployeeForm