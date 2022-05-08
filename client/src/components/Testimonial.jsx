import React from 'react'
import person from '../assets/images/jyoti.png';
const Testimonial = () => {
  return (
    <section className="py-5">
      <div className="container">
        <div className="row">
        	<div className="col-md-4">
            <div class="px-5 rounded py-4 text-center bg-light bg-gradient border shadow-sm">
              <div class="mb-2">
                <i class="bi bi-chat-quote fs-2 text-muted"></i>
              </div>
              <h5 class="mb-4">I get my accessories and spare parts from Moto Dang. We are professional collaborators with them and I strongly suggest them to everyone.</h5><img alt="" class="rounded-circle mb-2" src={person}/>
              <h6 class="text-secondary">Saurav Jyoti</h6>
            </div>
          </div>

          	<div className="col-md-4">
            <div class="px-5 rounded py-4 text-center bg-light bg-gradient border shadow-sm">
              <div class="mb-2">
                <i class="bi bi-chat-quote fs-2 text-muted"></i>
              </div>
              <h5 class="mb-4">I get my accessories and spare parts from Moto Dang. We are professional collaborators with them and I strongly suggest them to everyone.</h5><img alt="" class="rounded-circle mb-2" src={person}/>
              <h6 class="text-secondary">Saurav Jyoti</h6>
            </div>
          </div>

          	<div className="col-md-4">
            <div class="px-5 rounded py-4 text-center bg-light bg-gradient border shadow-sm">
              <div class="mb-2">
                <i class="bi bi-chat-quote fs-2 text-muted"></i>
              </div>
              <h5 class="mb-4">I get my accessories and spare parts from Moto Dang. We are professional collaborators with them and I strongly suggest them to everyone.</h5><img alt="" class="rounded-circle mb-2" src={person}/>
              <h6 class="text-secondary">Saurav Jyoti</h6>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonial