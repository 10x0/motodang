import React from 'react'

const Contact = () => {
  return (
    <section className='py-5'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-4'>
           <div className='mb-5'>
              <h4><em className='bi bi-phone small text-danger'></em>  Call Us</h4>
              <p>We're available from 10 am - 10 pm , 7 days a week.</p>
           </div>
           <div className='mb-5'>
              <h4 className='mb-4'><em className='bi bi-envelope small text-danger'></em>  Write to Us:</h4>
              <h5>Customer Service:</h5>
              <p>
customer@example.com</p>
           </div>
           <div className='mb-4'>
              <h4><em className='bi bi-map small text-danger'></em>  Find Us</h4>
              <p>New Baneshwor</p>
           </div>
          </div>
          <div className='col-md-8'>
            <h2 class="mb-4">Contact us</h2>

          <div className='row'>
            <div className='col-md-6'>
              <div className='mb-4'>
                <label class="mb-2">First Name</label>
                <input className='form-control'/>
              </div>
            </div>
            <div className='col-md-6'>
              <div className='mb-4'>
                <label class="mb-2">last Name</label>
                <input className='form-control'/>
              </div>
            </div>
            <div className='col-md-6'>
              <div className='mb-4'>
                <label class="mb-2">Email Address</label>
                <input type="email" className='form-control'/>
              </div>
            </div>
            <div className='col-md-6'>
              <div className='mb-4'>
                <label class="mb-2">Subject</label>
                <input className='form-control'/>
              </div>
            </div>
            <div className='col-md-12'>
            <label class="mb-2">Message</label>
              <textarea class="form-control mb-3" rows="5"></textarea>
              <div className='text-end'><a className='btn btn-primary' href="#">Submit</a></div>
            </div>
            
          </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact