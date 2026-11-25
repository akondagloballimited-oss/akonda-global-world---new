const {sendEmail,escapeHtml,json}=require('../lib/shared');
module.exports=async function handler(req,res){
 if(req.method!=='POST') return json(res,405,{ok:false,error:'Method not allowed.'});
 try{
  let d=req.body||{}; if(typeof d==='string') { try { d=JSON.parse(d); } catch { return json(res,400,{ok:false,error:'Invalid request format.'}); } }
  if(d.website) return json(res,200,{ok:true});
  for(const k of ['service','country','fullName','email','phone','details']) if(!String(d[k]||'').trim()) return json(res,400,{ok:false,error:'Please complete the '+k+' field.'});
  if(!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(String(d.email))) return json(res,400,{ok:false,error:'Please enter a valid email address.'});
  if(!process.env.OWNER_EMAIL) return json(res,503,{ok:false,error:'The enquiry email is not configured yet. Please contact the business directly.'});
  const id='AGW-'+Date.now().toString(36).toUpperCase()+'-'+Math.random().toString(36).slice(2,7).toUpperCase();
  const rows=[['Reference',id],['Service',d.service],['Request category',d.serviceCategory||'Not provided'],['Job / occupation category',d.workRole||'Not applicable'],['Destination country',d.country],['Departure',d.origin||'Not provided'],['Expected travel date',d.travelDate||'Not provided'],['Full name',d.fullName],['Email',d.email],['Phone / WhatsApp',d.phone],['Nationality',d.nationality||'Not provided'],['Details',d.details]];
  const table=rows.map(([k,v])=>'<tr><th align="left" style="padding:8px;border-bottom:1px solid #eee">'+escapeHtml(k)+'</th><td style="padding:8px;border-bottom:1px solid #eee">'+escapeHtml(v)+'</td></tr>').join('');
  const textBody='New enquiry '+id+'\\n\\n'+rows.map(([k,v])=>k+': '+v).join('\\n')+'\\n\\nPlease review and contact the applicant manually. Automated approval and document upload are disabled.';
  const htmlBody='<div style="font-family:Arial,sans-serif;max-width:700px;margin:auto"><h2>New AKONDO GLOBAL WORLD enquiry</h2><p>Review the request and contact the applicant manually. Online approval and document-upload functions are disabled. Do not request passport or identity files by ordinary email.</p><table style="border-collapse:collapse;width:100%">'+table+'</table></div>';
  await sendEmail({to:process.env.OWNER_EMAIL,subject:'New website enquiry '+id+' — '+d.service,text:textBody,html:htmlBody});
  return json(res,200,{ok:true,reference:id});
 }catch(e){console.error('submit-enquiry error',e.message);return json(res,500,{ok:false,error:'We could not send your enquiry. Please try again or contact us by email.'});}
};
