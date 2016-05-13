using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Virtualbiz.DG99.Portal.Admin.Controllers
{
   public class BaseController:Controller
    {
        public JsonResult GetSysMenu()
        {
          
            return Json(new {

                menus = Models.SysMenu.GetSysMenu()
            },JsonRequestBehavior.AllowGet);
        }
    }
}
