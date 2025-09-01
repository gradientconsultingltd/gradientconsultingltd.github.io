from flask import render_template, request, flash, redirect, url_for
from app import app, db
from models import ContactSubmission
from forms import ContactForm
import logging

@app.route('/')
def index():
    form = ContactForm()
    return render_template('index.html', form=form)

@app.route('/contact', methods=['POST'])
def contact():
    form = ContactForm()
    
    if form.validate_on_submit():
        try:
            # Create new contact submission
            submission = ContactSubmission(
                name=form.name.data,
                email=form.email.data,
                company=form.company.data,
                message=form.message.data
            )
            
            db.session.add(submission)
            db.session.commit()
            
            flash('Thank you for your message! We will get back to you soon.', 'success')
            logging.info(f"Contact form submitted by {form.email.data}")
            
        except Exception as e:
            db.session.rollback()
            flash('There was an error sending your message. Please try again.', 'error')
            logging.error(f"Contact form submission error: {str(e)}")
    
    else:
        # Form validation failed
        for field, errors in form.errors.items():
            for error in errors:
                flash(f'{getattr(form, field).label.text}: {error}', 'error')
    
    return redirect(url_for('index') + '#contact')

@app.route('/privacy')
def privacy():
    return render_template('privacy.html')

@app.route('/terms')
def terms():
    return render_template('terms.html')

@app.errorhandler(404)
def not_found_error(error):
    return render_template('base.html', title='Page Not Found'), 404

@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return render_template('base.html', title='Server Error'), 500
