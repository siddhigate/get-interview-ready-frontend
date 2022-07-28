import React from 'react'

const LoginForm = () => {
  return (
    <div className="min-height-90 flex flex-justify-center flex-items-center">
    <main className="auth-form container-center-sm">

        <h1 className="mb-xl fst-italic">Login</h1>

        <div className="form-control-wrapper">
            <label for="username" className="form-label">Enter your mail</label>
            <input id="username" type="email" className="form-control" placeholder="mail@domain.com"/>
        </div>

        <div className="form-control-wrapper">
            <label for="password" className="form-label">Enter password</label>
            <div className="pos-relative">
                <input id="password" type="password" className="form-control" placeholder="*******" />
                <i className="fas fa-eye-slash icon-eye"></i>
            </div>
        </div>

        <button className="btn btn-primary width-100"> Login </button>

        <a href="./signup.html" className="link">
            <p className="txt-gray txt-center mt-md">Don't have an account?
                <span className="txt-primary width-100">Sign up</span>
            </p>
        </a>

    </main>
</div>
  )
}

export default LoginForm